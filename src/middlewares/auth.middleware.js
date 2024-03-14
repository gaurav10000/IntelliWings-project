
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies.accessToken
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request!")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken.id).select("-password")
        if (!user) {
            throw new ApiError(401, "Unauthorized request!")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized request!")
    }
}   )