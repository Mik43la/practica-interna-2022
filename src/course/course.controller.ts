import {Controller, Delete, Get, Param, Post, Put, Body} from "@nestjs/common"
import { CourseService } from "./course.service"
import { CourseDto } from "./dto"

@Controller('course')
export class CourseController{
    constructor(private courseService: CourseService){}
    @Post('add')
    create(@Body() dto:CourseDto) {
        return this.courseService.create(dto)
    }

    @Put('update/:lecturer/:schedule/:startTerm/:season') 
    update(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term, @Param('season') season,@Body() dto:CourseDto){
        return this.courseService.update(lecturer, schedule, term, season, dto)
    }

    @Get()
    findAll() {
        return this.courseService.findAll()
    }

    @Get(':lecturer/:schedule/:startTerm/:season')
    find(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term,@Param('season') season,) {
        return this.courseService.find(lecturer, schedule, term, season)
    }

    @Delete(':lecturer/:schedule/:startTerm/:season')
    delete(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term, @Param('season') season,) {
        return this.courseService.delete(lecturer, schedule, term,season)
    }
}