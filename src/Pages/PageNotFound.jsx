import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#ffffff]">
            <div className="flex flex-col justify-center items-center relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <h1 className="text-9xl font-extrabold text-gray-700 tracking-widest">404</h1>
                <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute text-white">
                    Page Not Found
                </div>
                <button className="mt-5">
                    <div className="relative inline-block text-sm font-medium text-[#ffffff] group active:text-blue-600 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
                        <span className="relative block px-8 py-3 bg-gray-700 border border-current">
                            <Link to="/">Go Home</Link>
                        </span>
                    </div>
                </button>
            </div>
        </main>
    );
}

export default PageNotFound;
