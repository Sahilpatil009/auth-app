"use client"
import axios from "axios"
import React, {useState} from "react";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
import Link from "next/link"


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");

            router.push("/login")
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    }    
    
    const getUserDetails = async () => {
        const res = await axios("/api/users/me")
        console.log(res.data)


        setData(res.data.data._id)
    } 

    return (
        <div className="flex flex-col items-center justify-content min-h-screen py-50">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className="bg-red-600 p-2 m-4">{data !== "nothing" ? <Link href={`/profile/${data}`}>{data}</Link> : "Nothing"}</h2>
            <hr />

            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">logout</button>
            
            <button
            onClick={getUserDetails}
            className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold px-4 py-2 rounded">User Details</button>
        </div>
    )
}