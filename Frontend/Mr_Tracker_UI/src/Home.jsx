import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";


function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-blue-600 p-4">
            <div className="max-w-7xl mx-auto">
                <Header />
                <Body />
                <Footer />
            </div>

            {/* Decorative sparkle */}
            <div className="fixed bottom-8 right-8 w-16 h-16 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
        </div >
    );
}

export default Home;