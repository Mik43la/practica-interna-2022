import { Controller, Delete, Put, Get, Param, Post, Body } from "@nestjs/common";
import { RoleDto } from "./dto";
import { RoleService } from "./role.service";

@Controller('role')
export class RoleController{
    constructor(private roleService: RoleService) {}
    @Post('add')
    create(@Body() dto:RoleDto) {
        return this.roleService.create(dto)
    }

    @Put('update/:id') 
    update(@Param('id') id:string, @Body() dto:RoleDto){
        return this.roleService.update(id, dto)
    }

    @Get()
    findAll() {
        return this.roleService.findAll()
    }

    @Get(':id')
    find(@Param('id') id) {
        return this.roleService.find(id)
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.roleService.delete(id)
    }
}

