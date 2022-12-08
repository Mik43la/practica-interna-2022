import { Controller, Delete, Put, Get, Param, Post, Body } from "@nestjs/common";
import { SeasonDto } from "./dto";
import { SeasonService } from "./season.service";


@Controller('season')

export class SeasonController{
    constructor(private seasonService: SeasonService){}
    @Post('add')
    create(@Body() dto:SeasonDto) {
        return this.seasonService.create(dto)
    }

    @Put('update/:id') 
    update(@Param('id') id:string, @Body() dto:SeasonDto){
        return this.seasonService.update(id, dto)
    }

    @Get()
    findAll() {
        return this.seasonService.findAll()
    }

    @Get(':id')
    find(@Param('id') id) {
        return this.seasonService.find(id)
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.seasonService.delete(id)
    }
}