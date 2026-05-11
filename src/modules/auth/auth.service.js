import {BadRequestException, NotFoundtException} from "../../common/utils/error.utils.js";
import {checkUserExist} from "../user/user.services.js";
import {generateToken} from "../../common/index.js";
import {otpRepository} from "../../DataBase/models/otp/otp.repsitory.js";
import {sendEmail} from "../../common/utils/emai.util.js";
import {verify} from "jsonwebtoken";
import {Userrepository} from "../../DataBase/index.js";
import {tokenRepository} from "../../DataBase/models/token/token.repository.js";

export const login = async (body) => {
        const { email, password } = body;

        const userExist = await checkUserExist({
            email: { $eq: email, $exists: true, $ne: null },
        });
        if (!userExist) throw new NotFoundtException("User not found");

        const match = await bcrypt.compare(password, userExist.password);
        if (!match) throw new BadRequestException("Invalid credentials");

        const token = generateToken({ _id: userExist._id, role: userExist.role });

};


export const signup = async (body) => {
        const { email, phoneNumber, password } = body;

        const userExist = await checkUserExist({
            $or: [
                { email: { $eq: email, $exists: true, $ne: null } },
                { phoneNumber: { $eq: phoneNumber, $exists: true, $ne: null } },
            ],
        });
        if (userExist) throw new conflictException("User already exists");

        body.password = await bcrypt.hash(password, 10);
        if (phoneNumber) body.phoneNumber = encryption(phoneNumber);
        const otp = Math.floor(100000+Math.random()*900000) ;
        otpRepository.creat({email:email,otp:otp,expireAt:Date.now()+1000*60*10});
            sendEmail(email ,"verify your email", "your otp is : " + otp + "" );
        const newUser = await creatUser(body);
};

export const verifyOtp = async (body) => {
        const {email,otp} = body;
        const otpExist = await otpRepository.getOne({email:email});
        if (!otpExist) throw new NotFoundtException("Otp not found");
        if (otpExist.expireAt < Date.now()) throw new BadRequestException("Otp expired");
        if (otpExist.otp !== otp) throw new BadRequestException("Invalid otp");
    Userrepository.update({email:email},{isVerified:true});
    otpRepository.delete({_id:otpDoc._id});

        return true;
};
export const resendOtp = async (body) => {
    const {email} = body;
    const otpExist = await otpRepository.getOne({email:email});
    if (otpExist) throw new BadRequestException("Otp already sent");
    const otp = Math.floor(100000+Math.random()*900000) ;
    otpRepository.creat({email:email,otp:otp,expireAt:Date.now()+1000*60*10});
    sendEmail(email ,"verify your email", "your otp is : " + otp + "" );
}
export const logoutFromAllDevices = async (body) => {
    const {email} = body;
    const userExist = await checkUserExist({email:email});
    if (!userExist) throw new NotFoundtException("User not found");
    userExist.tokens = userExist.tokens.filter((token) => token.token !== body.token);
    await userExist.save();
    return true;

};
export const logout = async (tokenPayload , user) => {
    await  tokenRepository.creat({token:tokenPayload.
            token,userId:tokenPayload._id
    ,expireAt:tokenPayload.expireAt*1000});
}