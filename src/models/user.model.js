import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: "15m"
    }
    )
}

export const User = mongoose.model('user', userSchema);