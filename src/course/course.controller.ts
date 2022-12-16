import {Controller, Delete, Get, Param, Post, Put, Body, UseGuards} from "@nestjs/common"
import { CourseService } from "./course.service"
import { CourseDto } from "./dto"
import { JwtGuard } from "src/auth/guard";
import { RoleGuard } from "src/role/guards/role.guard";
import { Roles } from "src/role/decorators/role.decorator";

@UseGuards(JwtGuard, RoleGuard)
@Controller('course')
export class CourseController{
    constructor(private courseService: CourseService){}
    @Post('add')

    @Roles('admin', 'jefe')
    create(@Body() dto:CourseDto) {
        return this.courseService.create(dto)
    }

    @Roles('admin', 'jefe')
    @Put('update/:lecturer/:schedule/:startTerm/:season') 
    update(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term, @Param('season') season,@Body() dto:CourseDto){
        return this.courseService.update(lecturer, schedule, term, season, dto)
    }

    @Roles('admin', 'jefe')
    @Get()
    findAll() {
        return this.courseService.findAll()
    }

    @Roles('admin', 'jefe', 'student')
    @Get(':lecturer/:schedule/:startTerm/:season')
    find(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term,@Param('season') season,) {
        return this.courseService.find(lecturer, schedule, term, season)
    }

    @Roles('admin', 'jefe')
    @Delete(':lecturer/:schedule/:startTerm/:season')
    delete(@Param('lecturer') lecturer, @Param('schedule') schedule, @Param('startTerm') term, @Param('season') season,) {
        return this.courseService.delete(lecturer, schedule, term,season)
    }
}