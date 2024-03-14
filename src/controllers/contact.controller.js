import { Contact } from "../models/contact.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";



const createContact = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address} = req.body

    if ([firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address].some((field) => field.trim === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    let contact = await Contact.findOne({email})

    if (contact) {
        throw new ApiError(409, "Contact with same email already exists in database!")
    }

    contact = await Contact.create({
        firstName,
        middleName,
        lastName,
        fullName: `${firstName} ${middleName} ${lastName}`,
        email,
        phoneNumber1,
        phoneNumber2,
        address
    })

    if (!contact) {
        throw new ApiError(500, "Internal Server Error!")
    }

    res.status(201).json(new apiResponse(201, "Contact created successfully!", contact))

})

const editContact = asyncHandler(async(req, res) => {
    const {firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address} = req.body

    if ([firstName, middleName, lastName, email, phoneNumber1, phoneNumber2, address].some((field) => field.trim === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    let contact = await Contact.findOne({email})

    if (!contact) {
        throw new ApiError(404, "Contact not found!")
    }

    contact = await Contact.findOneAndUpdate({email}, {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber1,
        phoneNumber2,
        address
    }, {new: true})

    if (!contact) {
        throw new ApiError(500, "Internal Server Error!")
    }

    res.status(200).json(new apiResponse(200, "Contact updated successfully!", contact))
})

const deleteContact = asyncHandler(async(req, res) => {
    const {email} = req.body

    if (!email) {
        throw new ApiError(400, "Email is required!")
    }

    let contact = await Contact.findOneAndDelete({email})

    if (!contact) {
        throw new ApiError(404, "Contact not found!")
    }

    res.status(200).json(new apiResponse(200, "Contact deleted successfully!", contact))
})

const getAllContacts = asyncHandler(async(req, res) => {

    const {page, limit, orderBy} = req.query
    orderBy = orderBy || "fullName"
    const contacts = await Contact.find().sort({[orderBy]: 1}).skip((page - 1) * limit).limit(limit) 

    if (!contacts) {
        throw new ApiError(404, "No contacts found!")
    }

    res.status(200).json(new apiResponse(200, contacts, "Contacts fetched successfully!"))
    
})

export {
    createContact,
    editContact,
    deleteContact,
    getAllContacts
}
