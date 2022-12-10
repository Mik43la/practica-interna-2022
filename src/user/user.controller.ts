import { Controller, Delete, Body, Put, Get, Param, Post, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist";
import { UpdateDto, UserDto } from "./dto";
import { UserService } from "./user.service";
import { Request } from 'express';
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('user')
export class UserController{
    constructor(private userService: UserService) {}
    @Post('add')
    create(@Body() dto:UserDto) {
        return this.userService.create(dto)
    }

    @Put('update/:id') 
    update(@Param('id') id, @Body() dto:UpdateDto){
        return this.userService.update(id,dto)
    }

    @Put('activate/:id')
    activate(@Param('id')id){
        return this.userService.activate(id)
    }
    @Get()
    findAll() {
        return this.userService.findAll()
    }

    
    @Get(':id')
    find(@Param('id') id) {
        return this.userService.find(id)
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.userService.delete(id)
    }

    
    @Get('aaa')
    getMe(@GetUser() user: User,
          @GetUser('username') username: string) {
            console.log({
                username,
            });
        return user;
    }
}

