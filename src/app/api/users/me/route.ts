import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel.js";
import { connect } from "@/src/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password")

        return NextResponse.json({
            message:"User Found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({error: error instanceof Error ? error.message: "Something went wrong"})
    }
}