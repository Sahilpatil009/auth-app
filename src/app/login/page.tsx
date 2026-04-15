"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";



export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    }) 

    const onLogin = async () => {

    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col w-80 p-6 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

                <label htmlFor="email" className="mb-1">Email</label>
                <input 
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />

                <label htmlFor="password" className="mb-1">Password</label>
                <input 
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                />

                <button
                    onClick={onLogin}
                    className="p-2 bg-green-500 text-white rounded-lg mb-4 hover:bg-green-600 transition"
                >
                    Login here
                </button>

                <Link href="/signup" className="text-blue-500 text-center hover:underline">
                    Visit signup page
                </Link>
            </div>
        </div>
    )
}