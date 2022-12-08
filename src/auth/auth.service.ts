import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignDto } from "./dto";
import * as argon from 'argon2'
import { debugPort } from "process";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from '@nestjs/common/exceptions';
@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService){}

    async signup(  dto:AuthDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    username : dto.username,
                    email: dto.email,
                    name: dto.name,
                    code: dto.code,
                    password: hash,
                    rolename: dto.rolename,
                    
                },
            });
             
            delete user.password;
            return user;


         } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002'){
                    throw new ForbiddenException(
                        'Credentials are taken'
                    );
                }
            }
            throw error;
         }
        
    }

    async signin(dto: SignDto) {
       const user = 
       await this.prisma.user.findUnique({
        where: {
            username: dto.username,
        },
       });
       if (!user) {
            throw new ForbiddenException(
                'Credentials incorrect',
            );
       }

       const pwMatches = await argon.verify(
        user.password,
        dto.password,
       );

       if(!pwMatches){
        throw new ForbiddenException(
            'Credentials incorrect',
        );
        }

        if(user.deactivationTime != null ){
            throw new ForbiddenException(
                'This user has been deactivated.',
            )
        }
    delete user.password;
    return user;
    }
}