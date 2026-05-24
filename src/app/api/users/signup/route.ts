import {connect} from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel"
import { NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)

        const user = await User.findOne({email})

        if (user) { 
            return NextResponse.json({error: "User already exists"},
                {status: 400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred"
        return NextResponse.json({error: message},
            {status: 500})
    }
}

connect()
