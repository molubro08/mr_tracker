import React, { useState } from 'react';

function DashboardPage() {
    const [selectedTable, setSelectedTable] = useState('Sleep Data');

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
                    <nav className="relative z-20 flex items-center justify-between px-8 py-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                            <span className="text-white text-2xl font-bold">Trackflow</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-white hover:text-cyan-400 transition">Yourmine</a>
                            <a href="#" className="text-gray-300 hover:text-white transition">Morisation</a>
                            <a href="#" className="text-gray-300 hover:text-white transition">Dostemo</a>
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

                    {/* Hero Section */}
                    <div className="relative z-10 px-8 pb-12 pt-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-5xl font-bold text-white">AI Powered Dashboard</h1>

                            {/* AI Core Visualization */}
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
                                <div className="absolute inset-4 border-2 border-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Controls */}
                <div className="bg-slate-900 px-8 py-6 border-b border-slate-700">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-white font-medium">Select Table</span>
                            </div>
                            <select
                                value={selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                                className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option>Sleep Data</option>
                                <option>Activity Data</option>
                                <option>Nutrition Data</option>
                            </select>
                            <span className="text-gray-400 text-sm">Loading tables...</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="text-gray-300 text-sm">Jan 04, 5,8,3.7</span>
                            </div>
                            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition">
                                Generate Dashboard
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <main className="bg-slate-900 px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sleep Quality Chart */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6">
                            <h3 className="text-white text-xl font-semibold mb-6">Sleep Quality vs. Mood</h3>
                            <div className="relative h-64">
                                <svg className="w-full h-full" viewBox="0 0 600 250">
                                    <line x1="40" y1="200" x2="560" y2="200" stroke="#334155" strokeWidth="1" />
                                    <line x1="40" y1="150" x2="560" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                                    <line x1="40" y1="100" x2="560" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                                    <line x1="40" y1="50" x2="560" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4" />

                                    <text x="20" y="205" fill="#64748b" fontSize="12">0</text>
                                    <text x="15" y="155" fill="#64748b" fontSize="12">20</text>
                                    <text x="15" y="105" fill="#64748b" fontSize="12">40</text>
                                    <text x="15" y="55" fill="#64748b" fontSize="12">60</text>
                                    <text x="15" y="25" fill="#64748b" fontSize="12">80</text>

                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    <path d="M 50,140 L 90,130 L 130,110 L 170,90 L 210,100 L 250,70 L 290,85 L 330,75 L 370,95 L 410,80 L 450,60 L 490,50 L 530,40 L 550,35 L 550,200 L 50,200 Z" fill="url(#chartGradient)" />
                                    <path d="M 50,140 L 90,130 L 130,110 L 170,90 L 210,100 L 250,70 L 290,85 L 330,75 L 370,95 L 410,80 L 450,60 L 490,50 L 530,40 L 550,35" stroke="#06b6d4" strokeWidth="3" fill="none" />
                                </svg>
                            </div>
                        </div>

                        {/* Activity Types Donut */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6">
                            <h3 className="text-white text-xl font-semibold mb-6">Activity Types</h3>
                            <div className="flex items-center justify-center h-64">
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                                        <circle cx="100" cy="100" r="70" fill="none" stroke="#1e293b" strokeWidth="40" />
                                        <circle cx="100" cy="100" r="70" fill="none" stroke="#06b6d4" strokeWidth="40" strokeDasharray="176 440" strokeDashoffset="0" />
                                        <circle cx="100" cy="100" r="70" fill="none" stroke="#a855f7" strokeWidth="40" strokeDasharray="184 440" strokeDashoffset="-176" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">82%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weekly Calorie Intake */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6">
                            <h3 className="text-white text-xl font-semibold mb-6">Weekly Calorie Intake</h3>
                            <div className="relative h-64">
                                <svg className="w-full h-full" viewBox="0 0 500 250">
                                    <text x="10" y="30" fill="#64748b" fontSize="12">2800</text>
                                    <text x="10" y="130" fill="#64748b" fontSize="12">1400</text>
                                    <text x="20" y="230" fill="#64748b" fontSize="12">0</text>

                                    <line x1="50" y1="220" x2="480" y2="220" stroke="#334155" strokeWidth="1" />

                                    <rect x="60" y="140" width="15" height="80" fill="#a855f7" rx="2" />
                                    <rect x="78" y="120" width="15" height="100" fill="#06b6d4" rx="2" />
                                    <rect x="120" y="80" width="15" height="140" fill="#06b6d4" rx="2" />
                                    <rect x="162" y="100" width="15" height="120" fill="#a855f7" rx="2" />
                                    <rect x="180" y="90" width="15" height="130" fill="#06b6d4" rx="2" />
                                    <rect x="222" y="70" width="15" height="150" fill="#a855f7" rx="2" />
                                    <rect x="240" y="60" width="15" height="160" fill="#06b6d4" rx="2" />
                                    <rect x="282" y="130" width="15" height="90" fill="#a855f7" rx="2" />
                                    <rect x="300" y="120" width="15" height="100" fill="#06b6d4" rx="2" />
                                    <rect x="342" y="50" width="15" height="170" fill="#a855f7" rx="2" />
                                    <rect x="360" y="40" width="15" height="180" fill="#06b6d4" rx="2" />

                                    <text x="65" y="240" fill="#64748b" fontSize="12">27.00</text>
                                    <text x="170" y="240" fill="#64748b" fontSize="12">29.00</text>
                                    <text x="285" y="240" fill="#64748b" fontSize="12">01.00</text>
                                </svg>
                            </div>
                        </div>

                        {/* Activity Info */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 p-6">
                            <h3 className="text-white text-xl font-semibold mb-6">Activity Types</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Sleep quality analysis shows positive correlations with daily activity levels and nutrition intake patterns.
                            </p>
                        </div>

                        {/* Insights 1 */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-cyan-500/30 p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-semibold mb-2">Insights</h3>
                                    <p className="text-gray-300 text-sm">Your sleep patterns show improvement over the past week with better quality scores during weekends.</p>
                                </div>
                            </div>
                        </div>

                        {/* Insights 2 */}
                        <div className="bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-cyan-500/30 p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white text-lg font-semibold mb-3">Insights</h3>
                                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                                            <span className="text-white">Unanswered</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-300 text-sm">Track your daily metrics to get personalized insights and recommendations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-slate-900 border-t border-slate-800 px-8 py-8 rounded-b-2xl">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                            <span className="text-white text-2xl font-bold">Trackflow</span>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                            </a>
                        </div>
                        <div className="text-gray-400 text-sm">
                            <p>Email: info@trackflow.com</p>
                            <p>Phone: +1 (555) 122 467</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-800 text-center text-gray-500 text-sm">
                        © 2024 Trackflow Inc. All reserved.
                    </div>
                </footer>
            </div>

            {/* Sparkle */}
            <div className="fixed bottom-8 right-8 w-16 h-16 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
        </div>
    );
}

export default DashboardPage;