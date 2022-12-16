import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { StudentCoursesDto } from "./dto/student-courses.dto";
import { StudentCoursesService } from "./student-courses.service";
import { JwtGuard } from "src/auth/guard";
import { Roles } from "src/role/decorators/role.decorator";
import { RoleGuard } from "src/role/guards/role.guard";

@UseGuards(JwtGuard, RoleGuard)
@Controller('student-courses')
export class StudentCoursesController{
    constructor(private studentCoursesService: StudentCoursesService){}

    @Roles('admin', 'jefe')
    @Post('add')
    create(@Body() dto: StudentCoursesDto){
        return this.studentCoursesService.create(dto)
    } 

    @Roles('admin', 'jefe')
    @Get()
    findAll() {
        return this.studentCoursesService.findAll()
    }

    @Roles('admin', 'jefe', 'student')
    @Get(':studentCode/:courseLecturer/:courseSchedule/:courseSeason/:courseStartTerm')
    findCourseOfStudent( @Param('studentCode') studentCode,
    @Param('courseLecturer') courseLecturer,
    @Param('courseSchedule') courseSchedule,
    @Param('courseSeason') courseSeason,
    @Param('courseStartTerm') courseStartTerm){
        return this.studentCoursesService.findCourseOfStudent(studentCode,courseLecturer,courseSchedule,courseSeason,courseStartTerm)

    }

    @Roles('admin', 'jefe', 'student')
    @Get(':studentCode')
    findAllCoursesOfStudent( @Param('studentCode') studentCode){
        return this.studentCoursesService.findAllCoursesOfStudent(studentCode)

    }

    @Roles('admin', 'jefe')
    @Get(':courseLecturer/:courseSchedule/:courseSeason/:courseStartTerm')
    findCourseStudents(
    @Param('courseLecturer') courseLecturer,
    @Param('courseSchedule') courseSchedule,
    @Param('courseSeason') courseSeason,
    @Param('courseStartTerm') courseStartTerm){
        return this.studentCoursesService.findCourseStudents(courseLecturer,courseSchedule,courseSeason,courseStartTerm)

    }

    @Roles('admin', 'jefe')
    @Delete(':studentCode/:courseLecturer/:courseSchedule/:courseSeason/:courseStartTerm')
    delete(
        @Param('studentCode') studentCode,
        @Param('courseLecturer') courseLecturer,
        @Param('courseSchedule') courseSchedule,
        @Param('courseSeason') courseSeason,
        @Param('courseStartTerm') courseStartTerm
    ){
        return this.studentCoursesService.delete(studentCode,courseLecturer,courseSchedule,courseSeason,courseStartTerm)
    }


}