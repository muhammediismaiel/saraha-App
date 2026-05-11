import {model,Schema} from "mongoose";
const schema=new Schema({
    token:String,
    userId:{type:Schema.Types.ObjectId,ref:"User" ,  required :true,},
    expiresAt: {type: Date , required :true , index: { expires: 0 }},
})
export const Token=model("Token",schema)
