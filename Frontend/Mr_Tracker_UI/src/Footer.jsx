import React from "react";


function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 px-8 py-8 rounded-b-2xl">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
                        <span className="text-white text-2xl font-bold">Trackflow</span>
                    </div>

                    {/* Social Icons */}
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

                    {/* Links */}
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
    );
}

export default Footer;