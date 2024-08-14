import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MessageHelper } from "src/helpers/messages.helper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'login'});
    }

    async validate( login: string, password: string){
        const user = await this.authService.validateUser(login, password)
        if ( !user ){
            throw new UnauthorizedException(MessageHelper.PASSWORD_OR_LOGIN_INVALID)
        }
        return user;
    }
}