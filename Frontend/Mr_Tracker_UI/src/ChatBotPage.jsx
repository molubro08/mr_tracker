import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ChatbotPage() {
    const [reply, setReply] = useState("");

    const sendMessage = async () => {
        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            setReply(data.reply);
        } catch (error) {
            console.error("Error connecting to backend:", error);
        }
    };
    console.log("chatbot mounted");
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: 'You data& salmnd, 1ort, while walled yaji data. Ate daels corned.i anding its bare to trany, are certdamgr, minute votionstuerd wallou yel tmad, th ert not eng nace furnunt laege yie Macd walek ilmaue.',
            avatar: true
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSend = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                type: 'user',
                text: inputMessage
            }]);
            setInputMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-blue-600 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="relative bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden rounded-t-2xl">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>

                    {/* Navigation */}
                    <nav className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-slate-700/50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                            <span className="text-white text-2xl font-bold">Trackflow</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-gray-300 hover:text-white transition">Uost</a>
                            <a href="#" className="text-gray-300 hover:text-white transition flex items-center gap-1">
                                Mogin:MVorst
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition">
                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition">
                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </nav>

                    {/* Sub Navigation */}
                    <div className="relative z-10 px-8 py-4 flex items-center justify-between">
                        <div className="flex gap-6">
                            <a href="#" className="text-white font-medium hover:text-cyan-400 transition">Yourmine</a>
                            <a href="#" className="text-gray-400 hover:text-white transition">Mouratios</a>
                            <a href="#" className="text-gray-400 hover:text-white transition">Dostema</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate("/")}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                            <button onClick={() => navigate("/dashboard")}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition">
                                View Dashboard
                            </button>
                        </div>
                    </div>
                </header>

                {/* Chat Section */}
                <main className="bg-slate-900 px-8 py-8 min-h-150 relative">
                    <div className="max-w-4xl mx-auto">
                        {/* Chat Container */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm">
                            {/* Chat Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">AI Chat Assistant</h2>
                                <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                            </div>

                            {/* Search/Status Bar */}
                            <div className="flex items-center gap-3 mb-6 bg-slate-700/30 rounded-lg px-4 py-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="text-gray-400 text-sm">Logged: AI medistoans</span>
                            </div>

                            {/* Messages Area */}
                            <div className="space-y-6 mb-6 min-h-75 max-h-100 overflow-y-auto">
                                {messages.map((message) => (
                                    <div key={message.id} className="flex items-start gap-4">
                                        {message.type === 'ai' ? (
                                            <>
                                                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-blue-400 to-purple-500">
                                                    {message.avatar && (
                                                        <div className="w-full h-full bg-slate-600"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 bg-slate-700/50 rounded-2xl rounded-tl-sm p-4">
                                                    <p className="text-gray-300 text-sm leading-relaxed">{message.text}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex-1 bg-purple-600/30 rounded-2xl rounded-tr-sm p-4 ml-auto">
                                                    <p className="text-gray-200 text-sm leading-relaxed">{message.text}</p>
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-pink-500 shrink-0"></div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {/* AI Status Indicator */}
                                <div className="flex items-center justify-end gap-2">
                                    <span className="text-gray-400 text-xs">Master AI footage</span>
                                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Type your message..."
                                        className="w-full bg-slate-700/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={sendMessage}
                                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Background AI Core */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
                            <div className="absolute inset-8 border-2 border-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="w-20 h-20 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                                <div className="absolute -bottom-8 text-cyan-400 text-sm">AI Core</div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-slate-900 border-t border-slate-800 px-8 py-8 rounded-b-2xl">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                                <span className="text-white text-2xl font-bold">Trackflow</span>
                            </div>

                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    </svg>
                                </a>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                                <div className="text-gray-600">
                                    <p className="text-gray-400">Email: info@trackflow.com</p>
                                    <p className="text-gray-400">Phone: +1 (555) 122 467</p>
                                </div>
                                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-gray-500 text-sm">
                            © 2024 Trackflow Inc. All reserved.
                        </div>
                    </div>
                </footer>
            </div>

            {/* Decorative sparkle */}
            <div className="fixed bottom-8 right-8 w-16 h-16 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
        </div>
    );
}

export default ChatbotPage;