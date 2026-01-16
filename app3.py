from flask import Flask, render_template, request, jsonify, session
import os
import json
import pytz
import io
import base64
import re
from datetime import datetime, timedelta
from textwrap import dedent
from dotenv import load_dotenv
from typing import Dict, List, Optional

# Groq for vision and dashboard
from groq import Groq

# LangChain & CrewAI Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from crewai import Agent, Crew, Process, Task, LLM
from langchain_community.utilities import SQLDatabase
from langchain_community.tools.sql_database.tool import (
    InfoSQLDatabaseTool,
    QuerySQLDatabaseTool,
    QuerySQLCheckerTool,
)
from langchain.tools import tool

# Matplotlib for charts
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

load_dotenv()

app = Flask(__name__)
app.secret_key = os.urandom(24)

# ============================================================================
# CONFIGURATION
# ============================================================================
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
os.environ['GOOGLE_API_KEY'] = GOOGLE_API_KEY

MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = "naruto"
MYSQL_DB = "ai_agent"
MYSQL_PORT = 3306

# Initialize Groq client for vision
groq_client = Groq(api_key=GROQ_API_KEY)

# Initialize Groq LLM for dashboard
dashboard_llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=GROQ_API_KEY,
    temperature=0.3
)

# ============================================================================
# UTILITY: Markdown to HTML (Bold only)
# ============================================================================
def markdown_to_html(text: str) -> str:
    """Convert markdown bold syntax to HTML"""
    # Convert **text** to <strong>text</strong>
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    return text

# ============================================================================
# VISION FUNCTION
# ============================================================================
def analyze_image_with_groq(base64_image: str, user_query: str = "What's in this image?") -> str:
    """
    Analyze an image using Groq's vision model
    
    Args:
        base64_image: Base64 encoded image string
        user_query: Optional query about the image
    
    Returns:
        Description of what's in the image
    """
    try:
        print(f"[Vision API] Analyzing image with Groq...")
        
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_query},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="meta-llama/llama-4-scout-17b-16e-instruct",
        )
        
        image_description = chat_completion.choices[0].message.content
        print(f"[Vision API] Image analysis complete: {image_description[:100]}...")
        return image_description
        
    except Exception as e:
        print(f"[Vision API] Error: {str(e)}")
        return f"Error analyzing image: {str(e)}"

# ============================================================================
# MEMORY SYSTEM
# ============================================================================
class AgentMemory:
    """Manages conversation history and caches to reduce API calls"""
    
    def __init__(self):
        self.conversation_history = []
        self.cached_tables = []
        self.cached_schemas = {}
        self.last_query_result = None
        self.context_data = {}
        self.api_call_count = 0
        self.last_image_description = None
        
    def add_message(self, role: str, content: str):
        """Add message to conversation history"""
        self.conversation_history.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        if len(self.conversation_history) > 20:
            self.conversation_history = self.conversation_history[-20:]
    
    def get_recent_context(self, n: int = 4) -> str:
        """Get recent conversation for context"""
        if not self.conversation_history:
            return "No previous conversation"
        recent = self.conversation_history[-n:]
        return "\n".join([f"{msg['role']}: {msg['content']}" for msg in recent])
    
    def store_data(self, key: str, value):
        """Store contextual data"""
        self.context_data[key] = value
    
    def get_data(self, key: str):
        """Retrieve stored context"""
        return self.context_data.get(key)
    
    def increment_api_call(self):
        """Track API calls"""
        self.api_call_count += 1
        
    def get_api_count(self):
        """Get total API calls"""
        return self.api_call_count
    
    def get_conversation_history(self):
        """Get full conversation history"""
        return self.conversation_history
    
    def set_last_image_description(self, description: str):
        """Store the last image description"""
        self.last_image_description = description
    
    def get_last_image_description(self):
        """Get the last image description"""
        return self.last_image_description

# Initialize memory
memory = AgentMemory()

# ============================================================================
# LLM SETUP
# ============================================================================
llm_gemini = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0,
    max_retries=2,
    max_tokens=1024
)

gemini_crew_llm = LLM(
    model="gemini/gemini-2.5-flash-lite",
    api_key=GOOGLE_API_KEY,
    temperature=0.3,
    max_tokens=1024
)

# ============================================================================
# DATABASE CONNECTION
# ============================================================================
db_uri = f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
db = SQLDatabase.from_uri(db_uri)

# ============================================================================
# TOOL DEFINITIONS
# ============================================================================
@tool("list_tables")
def list_tables() -> str:
    """List all available tables in the database"""
    try:
        if memory.cached_tables:
            return f"Available tables: {', '.join(memory.cached_tables)}"
        
        result = db.get_usable_table_names()
        memory.cached_tables = result
        return f"Available tables: {', '.join(result)}"
    except Exception as e:
        return f"Error listing tables: {str(e)}"

@tool("get_table_schema")
def get_table_schema(table_name: str) -> str:
    """Get the schema and sample rows for a specific table"""
    try:
        if table_name in memory.cached_schemas:
            return memory.cached_schemas[table_name]
        
        tool = InfoSQLDatabaseTool(db=db)
        schema = tool.invoke(table_name)
        memory.cached_schemas[table_name] = schema
        return schema
    except Exception as e:
        return f"Error getting schema for {table_name}: {str(e)}"

@tool("execute_sql")
def execute_sql(sql_query: str) -> str:
    """Execute a SQL query and return results"""
    try:
        tool = QuerySQLDatabaseTool(db=db)
        result = tool.invoke(sql_query)
        memory.last_query_result = result
        return result
    except Exception as e:
        return f"Error executing SQL: {str(e)}"

@tool("check_sql")
def check_sql(sql_query: str) -> str:
    """Validate SQL query before execution"""
    if not sql_query.strip():
        return "Error: Empty query"
    
    dangerous_keywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER']
    query_upper = sql_query.upper()
    
    for keyword in dangerous_keywords:
        if keyword in query_upper and 'WHERE' not in query_upper:
            return f"Warning: {keyword} command detected without WHERE clause. Please be careful."
    
    return "Query looks safe to execute"

@tool("create_table")
def create_table(sql_statement: str) -> str:
    """Create a new table in the database"""
    try:
        tool = QuerySQLDatabaseTool(db=db)
        result = tool.invoke(sql_statement)
        memory.cached_tables = []
        memory.cached_tables = db.get_usable_table_names()
        return f"✅ Table created successfully"
    except Exception as e:
        if "already exists" in str(e).lower():
            return "ℹ️ Table already exists"
        return f"❌ Error creating table: {str(e)}"

@tool("request_table_fields")
def request_table_fields(table_name: str, purpose: str) -> str:
    """Ask user for field specifications when creating a table"""
    memory.store_data("pending_table", {
        "name": table_name,
        "purpose": purpose,
        "status": "awaiting_fields"
    })
    
    return f"""📋 I'll help you create a '{table_name}' table for {purpose}.

Please specify the fields you want to track. For example:

**For a nutrition tracking table:**
- food_item (VARCHAR(100))
- protein_g (DECIMAL(10,2))
- carbs_g (DECIMAL(10,2))
- fats_g (DECIMAL(10,2))

**For a water tracking table:**
- amount_ml (INT)
- time (TIME)

**Common data types:**
- INT - whole numbers
- DECIMAL(10,2) - money/decimals
- VARCHAR(n) - text up to n characters
- TEXT - long text
- TIME - time (HH:MM:SS)
- DATETIME - date and time together

Please tell me what fields you'd like, and I'll create the table for you!"""

@tool("confirm_and_create_table")
def confirm_and_create_table(table_name: str, fields_definition: str) -> str:
    """Create a table after user has specified the fields - automatically adds date column"""
    try:
        # Always ensure date column is added
        create_sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            date DATE NOT NULL,
            {fields_definition},
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
        
        tool = QuerySQLDatabaseTool(db=db)
        result = tool.invoke(create_sql)
        
        memory.cached_tables = db.get_usable_table_names()
        memory.store_data("pending_table", None)
        
        return f"""✅ Table '{table_name}' created successfully!

Structure:
- id (auto-incrementing primary key)
- date (DATE) - for tracking
- {fields_definition}
- created_at (timestamp)

You can now start adding data to this table!"""
        
    except Exception as e:
        if "already exists" in str(e).lower():
            return f"ℹ️ Table '{table_name}' already exists. Would you like to use it or create a different one?"
        return f"❌ Error creating table: {str(e)}"

@tool("insert_data")
def insert_data(sql_statement: str) -> str:
    """Insert data into a table"""
    try:
        tool = QuerySQLDatabaseTool(db=db)
        result = tool.invoke(sql_statement)
        return f"✅ Data inserted successfully"
    except Exception as e:
        return f"❌ Error inserting data: {str(e)}"

@tool("get_current_date")
def get_current_date() -> str:
    """Get the current date in IST timezone"""
    IST = pytz.timezone('Asia/Kolkata')
    current_date = datetime.now(IST).date()
    return str(current_date)

@tool("get_conversation_context")
def get_conversation_context() -> str:
    """Retrieve recent conversation history"""
    return memory.get_recent_context(4)

@tool("remember_info")
def remember_info(key: str, value: str) -> str:
    """Store important information for later reference"""
    memory.store_data(key, value)
    return f"✅ Remembered: {key}"

@tool("recall_info")
def recall_info(key: str) -> str:
    """Recall previously stored information"""
    data = memory.get_data(key)
    if data:
        return str(data)
    return f"No information found for: {key}"

@tool("get_image_description")
def get_image_description() -> str:
    """Get the description of the last uploaded image from vision model"""
    description = memory.get_last_image_description()
    if description:
        return f"Image description: {description}"
    return "No image has been uploaded yet."

@tool("find_correlations")
def find_correlations(table1: str, table2: str, date_col1: str = "date", date_col2: str = "date") -> str:
    """Find correlations between two tables by joining them on date"""
    try:
        query = f"""
        SELECT 
            DATE(t1.{date_col1}) as analysis_date,
            t1.*,
            t2.*
        FROM {table1} t1
        INNER JOIN {table2} t2 
        ON DATE(t1.{date_col1}) = DATE(t2.{date_col2})
        ORDER BY t1.{date_col1} DESC
        LIMIT 50
        """
        
        tool = QuerySQLDatabaseTool(db=db)
        result = tool.invoke(query)
        
        if not result or result.strip() == "[]":
            return f"""No overlapping dates found between '{table1}' and '{table2}'.

Possible reasons:
- Tables don't have data for the same dates
- Date columns might be named differently
- One or both tables are empty

Suggestion: Check table schemas or add data for matching dates."""
        
        memory.store_data("last_correlation", {
            "table1": table1,
            "table2": table2,
            "result": result
        })
        
        return f"""✅ Correlation Analysis: {table1} ↔ {table2}

Merged Data:
{result}

📊 Please analyze patterns and provide insights."""
        
    except Exception as e:
        return f"❌ Error finding correlations: {str(e)}"

# ============================================================================
# AGENT SETUP
# ============================================================================
personal_assistant = Agent(
    role="Personal Life Assistant & Data Analyst with Vision",
    goal="""Help users track their life, analyze patterns, and provide insights.
    Process image descriptions from vision model and understand user context.""",
    backstory=dedent("""
        You are an intelligent personal assistant with vision capabilities.
        
        VISION WORKFLOW:
        When a user uploads an image with text context:
        1. The vision model (Groq) analyzes the image and provides a description
        2. You receive BOTH the image description AND the user's text request
        3. Your job is to understand the user's intent from their text
        4. Use the image description to extract relevant information
        5. Perform the requested task (e.g., track nutrition, log items, etc.)
        
        EXAMPLE WORKFLOW:
        User uploads pizza image and says: "track protein, carbs, and fats from this"
        - Vision model tells you: "This is a large pepperoni pizza"
        - You understand: User wants to track nutrition for pizza
        - You should: Create/use nutrition table and insert estimated values
        
        IMPORTANT INSTRUCTIONS:
        
        1. HANDLING IMAGES:
           - Use get_image_description tool to see what the vision model detected
           - The user's text tells you WHAT TO DO with the image
           - Combine image description + user intent to complete the task
           - Ask clarifying questions if needed
        
        2. CREATING TABLES:
           - When tracking new data types, use request_table_fields first
           - Wait for user's field specifications
           - Then use confirm_and_create_table
           - ALWAYS include date column (it's automatically added, don't mention it)
        
        3. NUTRITION TRACKING:
           - If tracking food from images, estimate reasonable nutrition values
           - Include: protein_g, carbs_g, fats_g, calories (if relevant)
           - Acknowledge estimates: "Based on the image..."
        
        4. DATA INSERTION:
           - Always use current date from get_current_date
           - Insert data based on image description + user intent
        
        5. CONVERSATION:
           - Be helpful and conversational
           - Explain what you're doing with the image
           - Provide insights when analyzing data
           - Use **bold text** for emphasis when appropriate
        
        Available tables: {tables}
    """).format(tables=", ".join(memory.cached_tables) if memory.cached_tables else "None yet"),
    llm=gemini_crew_llm,
    tools=[
        list_tables, get_table_schema, request_table_fields, confirm_and_create_table,
        insert_data, execute_sql, check_sql, get_current_date,
        get_conversation_context, remember_info, recall_info,
        find_correlations, get_image_description
    ],
    allow_delegation=False,
    verbose=True
)

# ============================================================================
# DASHBOARD FUNCTIONS
# ============================================================================
def generate_dashboard(table_name: str, start_date: str, end_date: str) -> Dict:
    """Generate dashboard with charts and AI insights using MySQL connector directly"""
    import mysql.connector
    
    try:
        # 1. Connect directly to MySQL
        connection = mysql.connector.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB,
            port=MYSQL_PORT
        )
        cursor = connection.cursor(dictionary=True)
        
        # 2. Get basic stats
        stats_query = f"""
        SELECT 
            COUNT(*) as total_entries,
            COUNT(DISTINCT date) as unique_days
        FROM {table_name}
        WHERE date BETWEEN %s AND %s
        """
        cursor.execute(stats_query, (start_date, end_date))
        stats = cursor.fetchone()
        
        total_entries = stats['total_entries']
        unique_days = stats['unique_days']
        
        print(f"[Dashboard] Stats - Total: {total_entries}, Days: {unique_days}")
        
        if total_entries == 0:
            cursor.close()
            connection.close()
            return {
                "error": "No data found for the selected date range",
                "charts": [],
                "summary": None
            }
        
        # 3. Get all data for analysis
        data_query = f"""
        SELECT * FROM {table_name}
        WHERE date BETWEEN %s AND %s
        ORDER BY date ASC
        """
        cursor.execute(data_query, (start_date, end_date))
        raw_data = cursor.fetchall()
        
        # 4. Get table schema
        cursor.execute(f"DESCRIBE {table_name}")
        schema_info = cursor.fetchall()
        schema_str = "\n".join([f"{col['Field']} ({col['Type']})" for col in schema_info])
        
        # 5. Convert data to JSON string for LLM
        data_sample = raw_data[:10] if len(raw_data) > 10 else raw_data
        data_json = json.dumps(data_sample, default=str)
        
        # 6. Ask LLM to analyze and suggest charts
        prompt = f"""You are a data analyst. Analyze this data and suggest 1-5 meaningful charts.

**Table:** {table_name}
**Date Range:** {start_date} to {end_date}
**Total Entries:** {total_entries}
**Unique Days:** {unique_days}
**Schema:** 
{schema_str}
**Sample Data (first 10 rows):** 
{data_json}

**Available chart types:**
- line: for trends over time
- bar: for comparisons or daily values
- pie: for distribution/proportions
- area: for cumulative trends

**Your task:**
1. Analyze the data patterns
2. Suggest 1-5 charts (minimum 1, maximum 5) that provide meaningful insights
3. For each chart, provide the exact SQL query to get the data

**Return ONLY valid JSON in this format:**
{{
  "charts": [
    {{
      "type": "line",
      "title": "Chart Title",
      "sql_query": "SELECT date, column_name FROM {table_name} WHERE date BETWEEN '{start_date}' AND '{end_date}' ORDER BY date",
      "x_label": "Date",
      "y_label": "Value",
      "description": "Brief insight about what this shows"
    }}
  ],
  "insights": "2-3 sentence AI analysis of patterns, trends, and key findings",
  "improvement_strategy": "2-3 actionable recommendations based on the data"
}}

Return ONLY the JSON, no other text."""

        print(f"[Dashboard] Asking LLM for chart suggestions...")
        llm_response = dashboard_llm.invoke(prompt)
        
        # Parse LLM response
        content = llm_response.content.strip()
        content = re.sub(r'```json\s*|\s*```', '', content).strip()
        
        dashboard_config = json.loads(content)
        
        # 7. Generate charts based on LLM suggestions
        charts = []
        for chart_config in dashboard_config.get('charts', []):
            try:
                # Execute the SQL query suggested by LLM
                chart_sql = chart_config['sql_query']
                cursor.execute(chart_sql)
                chart_data = cursor.fetchall()
                
                if not chart_data or len(chart_data) == 0:
                    continue
                
                # Extract x and y values
                keys = list(chart_data[0].keys())
                if len(keys) < 2:
                    continue
                    
                x_values = [str(row[keys[0]]) for row in chart_data]
                y_values = [float(row[keys[1]]) if row[keys[1]] is not None else 0 for row in chart_data]
                
                # Create chart
                plt.figure(figsize=(10, 6))
                
                chart_type = chart_config.get('type', 'bar')
                
                if chart_type == 'line':
                    plt.plot(x_values, y_values, marker='o', linewidth=2, markersize=8, color='#667eea')
                elif chart_type == 'bar':
                    plt.bar(x_values, y_values, color='#667eea', edgecolor='black')
                elif chart_type == 'area':
                    plt.fill_between(range(len(x_values)), y_values, alpha=0.6, color='#667eea')
                    plt.plot(x_values, y_values, linewidth=2, color='#764ba2')
                elif chart_type == 'pie':
                    plt.pie(y_values, labels=x_values, autopct='%1.1f%%', startangle=90)
                
                plt.xlabel(chart_config.get('x_label', 'X Axis'))
                plt.ylabel(chart_config.get('y_label', 'Y Axis'))
                plt.title(chart_config.get('title', 'Chart'), fontsize=14, fontweight='bold')
                
                if chart_type != 'pie':
                    plt.xticks(rotation=45, ha='right')
                    plt.grid(axis='y', linestyle='--', alpha=0.3)
                
                plt.tight_layout()
                
                # Convert to base64
                buf = io.BytesIO()
                plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
                buf.seek(0)
                chart_base64 = base64.b64encode(buf.read()).decode('utf-8')
                plt.close()
                
                charts.append({
                    "image": chart_base64,
                    "title": chart_config.get('title'),
                    "description": chart_config.get('description')
                })
                
                print(f"[Dashboard] Generated chart: {chart_config.get('title')}")
                
            except Exception as e:
                print(f"[Dashboard] Error generating chart: {e}")
                continue
        
        # 8. Close database connection
        cursor.close()
        connection.close()
        
        # 9. Prepare summary
        summary = {
            "total_entries": total_entries,
            "unique_days": unique_days,
            "insights": dashboard_config.get('insights', 'No insights available'),
            "improvement_strategy": dashboard_config.get('improvement_strategy', 'No recommendations available')
        }
        
        print(f"[Dashboard] Generated {len(charts)} charts successfully")
        
        return {
            "charts": charts,
            "summary": summary,
            "table_name": table_name,
            "date_range": f"{start_date} to {end_date}"
        }
        
    except Exception as e:
        print(f"[Dashboard] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "error": f"Error generating dashboard: {str(e)}",
            "charts": [],
            "summary": None
        }

# ============================================================================
# CHAT FUNCTION
# ============================================================================
def chat(user_query: str, image_base64: str = None) -> Dict:
    """Main chat interface with vision support"""
    
    # Handle image if provided
    image_description = None
    if image_base64:
        print("\n🖼️ Image uploaded - analyzing with Groq vision model...")
        image_description = analyze_image_with_groq(
            image_base64, 
            "Describe this image in detail, focusing on food items, objects, or activities visible."
        )
        memory.set_last_image_description(image_description)
        print(f"📸 Vision Result: {image_description}\n")
        
        # Enhance user query with image context
        enhanced_query = f"""[Image uploaded - Vision model detected: {image_description}]

User request: {user_query}

Please process this request considering both the image description and the user's intent."""
        
        memory.add_message("user", f"{user_query} [with image]")
    else:
        enhanced_query = user_query
        memory.add_message("user", user_query)
    
    # Quick responses for greetings
    greetings = {
        "hello": "Hi! I'm your personal assistant with vision capabilities. I can help you track habits, analyze patterns, and process images. What would you like to do?",
        "hi": "Hello! How can I help you today?",
        "hey": "Hey there! What can I do for you?",
        "thanks": "You're welcome! Anything else?",
        "thank you": "Happy to help! Let me know if you need anything else.",
    }
    
    query_lower = user_query.lower().strip()
    for key, response in greetings.items():
        if query_lower == key or query_lower == key + "!":
            memory.add_message("assistant", response)
            return {"response": response, "chart": None, "image_description": None}
    
    # Build context-aware task
    context = memory.get_recent_context(3)
    
    task = Task(
        description=dedent(f"""
            User Query: {enhanced_query}
            
            Recent Conversation:
            {context}
            
            Available Tables: {', '.join(memory.cached_tables) if memory.cached_tables else 'None'}
            
            Instructions:
            - If image was uploaded, use get_image_description to see what was detected
            - Understand the user's intent from their text
            - Combine image info + user intent to complete the task
            - Be conversational and explain your actions
            - Use **bold text** for emphasis when appropriate
            - Only query database when necessary
        """),
        expected_output="A helpful response that addresses the user's request with image context if provided",
        agent=personal_assistant,
    )
    
    crew = Crew(
        agents=[personal_assistant],
        tasks=[task],
        process=Process.sequential,
        verbose=True
    )
    
    print(f"[API Call #{memory.api_call_count + 1}] Processing query...")
    memory.increment_api_call()
    
    result = crew.kickoff()
    response = str(result)
    
    memory.add_message("assistant", response)
    
    # Check if visualization was requested
    chart_data = None
    if any(keyword in user_query.lower() for keyword in ['visualize', 'visualise', 'plot', 'chart', 'graph']):
        if 'show me' in user_query.lower() and not any(viz_word in user_query.lower() for viz_word in ['visualize', 'visualise', 'plot', 'chart', 'graph']):
            return {"response": response, "chart": None, "image_description": image_description}
            
        visualizer_prompt = f"""
        Convert the following agent output into structured JSON for visualization.
        Output MUST be valid JSON with these keys:
        - 'x_axis': list of strings/dates
        - 'y_axis': list of numbers
        - 'title': string
        - 'chart_type': 'bar', 'line', or 'pie'
        - 'xlabel': string
        - 'ylabel': string
        
        Agent Output: {response}
        
        Extract x and y values from the data.
        """
        
        try:
            print(f"[API Call #{memory.api_call_count + 1}] Creating visualization...")
            memory.increment_api_call()
            
            llm_response = llm_gemini.invoke(visualizer_prompt)
            content = llm_response.content.replace('```json', '').replace('```', '').strip()
            data = json.loads(content)
            
            x_axis = data.get('x_axis', [])
            y_axis = data.get('y_axis', [])
            
            if x_axis and y_axis and len(x_axis) == len(y_axis):
                chart_type = data.get('chart_type', 'bar')
                
                plt.figure(figsize=(10, 6))
                
                if chart_type == 'bar':
                    plt.bar(x_axis, y_axis, color='skyblue', edgecolor='black')
                elif chart_type == 'line':
                    plt.plot(x_axis, y_axis, marker='o', linewidth=2, markersize=8)
                elif chart_type == 'pie':
                    plt.pie(y_axis, labels=x_axis, autopct='%1.1f%%')
                else:
                    plt.bar(x_axis, y_axis, color='skyblue', edgecolor='black')
                
                plt.xlabel(data.get('xlabel', 'Date'))
                plt.ylabel(data.get('ylabel', 'Value'))
                plt.title(data.get('title', 'Data Visualization'))
                
                if chart_type != 'pie':
                    plt.xticks(rotation=45)
                    plt.grid(axis='y', linestyle='--', alpha=0.7)
                
                plt.tight_layout()
                
                buf = io.BytesIO()
                plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
                buf.seek(0)
                chart_data = base64.b64encode(buf.read()).decode('utf-8')
                plt.close()
                
                print(f"\n✅ Visualization created")
                
        except Exception as e:
            print(f"\n⚠️ Visualization error: {e}")
    
    print(f"🔢 Total API calls: {memory.get_api_count()}\n")
    return {"response": response, "chart": chart_data, "image_description": image_description}

# ============================================================================
# FLASK ROUTES
# ============================================================================
@app.route('/')
def home():
    """Render the main page"""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    """Handle chat messages with optional image"""
    data = request.json
    user_message = data.get('message', '')
    image_data = data.get('image', None)
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    # Extract base64 image if provided
    image_base64 = None
    if image_data:
        # Remove data URL prefix if present
        if ',' in image_data:
            image_base64 = image_data.split(',')[1]
        else:
            image_base64 = image_data
    
    result = chat(user_message, image_base64)
    
    # Convert markdown to HTML
    response_html = markdown_to_html(result["response"])
    
    return jsonify({
        "response": response_html,
        "chart": result["chart"],
        "image_description": result.get("image_description"),
        "api_calls": memory.get_api_count(),
        "timestamp": datetime.now().isoformat()
    })

@app.route('/stats')
def get_stats():
    """Get current statistics"""
    try:
        tables = db.get_usable_table_names()
        memory.cached_tables = tables
    except:
        tables = []
    
    return jsonify({
        "total_tables": len(tables),
        "tables": tables,
        "api_calls": memory.get_api_count(),
        "messages": len(memory.conversation_history)
    })

@app.route('/history')
def get_history():
    """Get conversation history"""
    return jsonify({
        "history": memory.get_conversation_history()
    })

@app.route('/clear', methods=['POST'])
def clear_conversation():
    """Clear conversation history"""
    memory.conversation_history = []
    memory.context_data = {}
    memory.last_image_description = None
    return jsonify({"message": "Conversation cleared"})

@app.route('/dashboard', methods=['POST'])
def dashboard_endpoint():
    """Generate dashboard for selected table and date range"""
    data = request.json
    table_name = data.get('table')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    
    if not all([table_name, start_date, end_date]):
        return jsonify({"error": "Missing required parameters"}), 400
    
    print(f"[Dashboard] Generating for {table_name} from {start_date} to {end_date}")
    
    result = generate_dashboard(table_name, start_date, end_date)
    
    return jsonify(result)

# ============================================================================
# MAIN ENTRY POINT
# ============================================================================
if __name__ == '__main__':
    print("=" * 60)
    print("🤖 PERSONAL AI ASSISTANT WITH VISION - WEB SERVER")
    print("=" * 60)
    print("Starting Flask server...")
    print("=" * 60)
    print()
    
    try:
        result = db.get_usable_table_names()
        memory.cached_tables = result
        print(f"📊 Found {len(result)} tables: {', '.join(result)}\n" if result else "📊 No tables found yet.\n")
    except Exception as e:
        print(f"⚠️ Could not initialize tables: {e}\n")
    
    print("🌐 Server running at: http://localhost:5000")
    print("📝 Access the web interface in your browser")
    print("🖼️ Vision support: Upload images with your queries!")
    print("📊 Dashboard: Analyze your data with AI-powered insights!")
    print("=" * 60)
    print()
    
    app.run(debug=True, port=5000, host='0.0.0.0')