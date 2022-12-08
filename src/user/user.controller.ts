import { Controller, Delete, Body, Put, Get, Param, Post } from "@nestjs/common";
import { UpdateDto, UserDto } from "./dto";
import { UserService } from "./user.service";

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
}

