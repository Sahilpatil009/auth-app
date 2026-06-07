import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT!) as JwtPayload;

        return decodedToken.id;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message: "Something went wrong")
    }
}