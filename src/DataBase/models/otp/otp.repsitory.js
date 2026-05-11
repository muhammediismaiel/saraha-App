import {DBRepository} from "../../d.repository.js";
import {OTP} from "./otp.model.js";

class OtpRepository extends DBRepository{constructor(){super(OTP)}}
export const otpRepository=new OtpRepository();