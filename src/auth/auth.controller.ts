import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, SignDto } from "./dto";
import { Req, UseGuards } from "@nestjs/common/decorators";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}
    
    @Post('signup')
    signup(@Body() dto:AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto:SignDto) {
        return this.authService.signin(dto)
    }
}

