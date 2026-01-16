import React from 'react';
import { useNavigate } from "react-router-dom";

// Header Component
function Header() {
    console.log("Header mounted");
    const navigate = useNavigate();
    return (


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
                    <a href="#" className="text-gray-300 hover:text-white transition">Host</a>
                    <a href="#" className="text-gray-300 hover:text-white transition flex items-center gap-1">
                        Meet
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

            {/* Hero Content */}
            <div className="relative z-10 px-8 pb-16 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left side */}
                    <div className="text-white space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            Your Life's Data, Intelligally<br />Connected.
                        </h1>
                        <p className="text-gray-300 text-lg">Scattered data, limited insights.</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate("/chatbot")}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
                            >
                                Start Chatting
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
                            >
                                View Dashboard
                            </button>
                        </div>
                    </div>

                    {/* Right side - AI Core visualization */}
                    <div className="relative flex items-center justify-center">
                        <div className="relative w-80 h-80">
                            {/* Outer rings */}
                            <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse"></div>
                            <div className="absolute inset-8 border-2 border-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                            {/* Center brain icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <svg className="w-24 h-24 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                    </svg>
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm whitespace-nowrap">
                                        AI Core
                                    </div>
                                </div>
                            </div>

                            {/* Corner icons */}
                            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                </svg>
                            </div>

                            {/* Chart visualization */}
                            <div className="absolute top-1/4 -right-12">
                                <svg className="w-24 h-16 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                        </div>

                        {/* Unified AI text */}
                        <div className="absolute top-0 right-0 text-white text-right">
                            <div className="text-lg">Unified AI,</div>
                            <div className="text-lg italic">actionable intelligence</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
// function Header() {
//     return (
//         <>
//             <div>
//                 <header
//                     className="relative h-[40vh] flex items-start justify-start rounded-t-2xl"
//                     style={{
//                         backgroundImage: `url(${headerBg})`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-black/50"></div>

//                     {/* Content */}
//                     <div class='header-title-logo' className="relative z-10 flex flex-col items-center">
//                         <nav>
//                             <div class='logo and title' className="relative z-10 text-center text-white px-6">
//                                 <div class='logo' style={{ backgroundImage: `url(${logo})` }}></div>
//                                 <h1 className="text-5xl font-bold">TrackFlow</h1>
//                                 <p className="mt-4 text-lg opacity-90 text-center">
//                                     Track Anything, Understand
//                                 </p>
//                                 <p className="text-lg opacity-90 text-left">Everything</p>
//                             </div>
//                         </nav>
//                     </div>
//                 </header>
//             </div>
//         </>
//     );
// }
export default Header;