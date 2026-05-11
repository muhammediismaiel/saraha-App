import {model, Schema} from "mongoose";
const schema = new Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
expiresAt: {
        type: Date, required: true,
index: {expires: 0}
},
},{timestamps: true})
export const  OTP = model('otp', schema)