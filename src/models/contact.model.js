import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    middleName: {
        type: String,
        required: [true, 'Middle name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phoneNumber1: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    phoneNumber2: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    }
})

export const Contact = mongoose.model('Contact', contactSchema)