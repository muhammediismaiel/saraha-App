import {DBRepository} from "../../d.repository.js";
import {Token} from "./token.model.js";

export class TokenRepository extends DBRepository{
    constructor() {
        super(Token)
    }
}
export const tokenRepository=new TokenRepository();