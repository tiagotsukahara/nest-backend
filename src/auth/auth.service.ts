import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Users from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
    constructor( private readonly userService: UsersService, private jwtService: JwtService){}

    async validateUser(login:string, password:string){
        const user = await this.userService.findOneWithLogin(login);
            if ( user && (await bcrypt.compare(password, user.password)) ){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: Users){
        const payload = {
            sub: user.id,
            login: user.login,
            name: user.name
        }

        return {
            ...user,
            acessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {expiresIn: '7d'})
        }
    }

    async refreshToken(user: Users){
        console.log(user)
        const payload = {
            sub: user.id,
            login: user.login,
            name: user.name
        }

        return {
            acessToken: this.jwtService.sign(payload),
        }
    }

}
