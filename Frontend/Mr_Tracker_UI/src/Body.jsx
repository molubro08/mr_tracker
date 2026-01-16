import React from "react";

function Body() {
    return (
        <main className="bg-slate-900 px-8 py-16">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* How it Works Section */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-8">How it Works</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* AI Interaction Demo */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm">AI</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm">Ate a salmon salad and walked 6k/10k steps</p>
                                    </div>
                                    <div className="w-12 h-12 bg-slate-700 rounded-lg overflow-hidden">
                                        <div className="w-full h-full bg-linear-to-br from-orange-400 to-yellow-500"></div>
                                    </div>
                                </div>
                                <div className="pl-13 text-cyan-400 text-xs">Logged: All interactions</div>
                                <div className="flex items-start gap-3 mt-4">
                                    <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                                    <div>
                                        <p className="text-gray-300 text-sm">Logged: 650 kcal, 40g protein walk.</p>
                                        <p className="text-gray-400 text-sm">Noted: Mood boost after walk.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Panel */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                            <div className="mb-4">
                                <h3 className="text-white font-semibold mb-2">Features</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white">Nutrition</p>
                                        <p className="text-xs text-gray-400">Calories, Step Tracker</p>
                                    </div>
                                    <div className="w-12 h-6 bg-cyan-500 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-lg">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">Step track</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-lg">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">Activity</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-lg">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">Step Timely Tracker</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-lg">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">Correlation to Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition">
                        <svg className="w-12 h-12 text-cyan-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        <h3 className="text-white text-xl font-semibold mb-2">Multimodal AI Input</h3>
                        <p className="text-gray-400">Log data naturally with voice, text, images. Our AI understands context.</p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition">
                        <svg className="w-12 h-12 text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="text-white text-xl font-semibold mb-2">Unified Analytics & Patterns</h3>
                        <p className="text-gray-400">Securely connect all your data. Discover hidden correlations and trends</p>
                    </div>

                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition">
                        <svg className="w-12 h-12 text-cyan-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h3 className="text-white text-xl font-semibold mb-2">Actionable Intelligence</h3>
                        <p className="text-gray-400">Receive personalized, clear recommendations for your key aim</p>
                    </div>
                </section>

                {/* Impact Section */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-8">Impact</h2>
                    <div className="bg-linear-to-r from-cyan-900/20 to-transparent border-l-4 border-cyan-500 p-8 rounded-lg">
                        <h3 className="text-2xl text-white mb-8 text-center">Trackflow made my data speak.</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full shrink-0"></div>
                                <div>
                                    <p className="text-gray-300 italic">"Warrior stand behavior, and yes moti daunt dicon koua."</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-full shrink-0"></div>
                                <div>
                                    <p className="text-gray-300 italic">"Visitors diet dasthe ins yos your ord omished dassians"</p>
                                    <p className="text-gray-400 text-sm mt-2">Receive personalized, clearly, test assessment dradiur exist naer star dars lonnrad declisidas."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Body;