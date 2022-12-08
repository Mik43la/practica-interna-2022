import { Controller, Delete, Put, Get, Param, Post, Body } from "@nestjs/common";
import { CareerService } from "./career.service";
import { CareerDto } from "./dto";
import { ParseIntPipe } from "@nestjs/common/pipes";

@Controller('career')
export class CareerController{
    constructor(private careerService: CareerService) {}
    @Post('add')
    create(@Body() dto:CareerDto) {
        return this.careerService.create(dto)
    }

    @Put('update/:id') 
    update(@Param('id', ParseIntPipe) id, @Body() dto:CareerDto){
        return this.careerService.update(id,dto)
    }

    @Get()
    findAll() {
        return this.careerService.findAll()
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id) {
        return this.careerService.find(id)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id) {
        return this.careerService.delete(id)
    }
}

