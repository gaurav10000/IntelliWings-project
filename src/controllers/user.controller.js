import { User } from '../models/user.model.js'
import {ApiError} from '../utils/apiError.js'
import {apiResponse} from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if (!(name && password && email)) {
        throw new ApiError(400, "All fields are required!")
    }

    let user = await User.findOne({email})

    if (user) {
        throw new ApiError(409, "Already a user with same email exists in database!")
    }

    user = await User.create({
        name,
        email,
        password
    })

    if (!user) {
        throw new ApiError(500, "Internal Server Error")
    }

    res.status(201).json(new apiResponse(201, "User created successfully!", user))    
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if (!(email || password)) {
        throw new ApiError(400, "All fields are required!")
    }

    let user = await User.findOne({email}).select("-__v")

    if (!user) {
        throw new ApiError(404, "User not found!")
    }

    const isMatch = await user.matchPassword(typeof password != "string"? `${password}` : password )

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials!")
    }

    const accessToken = await user.generateAccessToken()

    if (!accessToken) {
        throw new ApiError(500, "Internal Server Error!")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: {
                        name: user.name,
                        email: user.email
                    }, accessToken
                },
                "User logged in Successfully!"
            )
        )
})

const logoutUser = async(req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .clearCookie("accessToken", options)
        .json(new apiResponse(200, {}, "User logged out successfully!"))
}


export {
    registerUser,
    loginUser,
    logoutUser
}