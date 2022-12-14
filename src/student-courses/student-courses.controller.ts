import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { StudentCoursesDto } from "./dto/student-courses.dto";
import { StudentCoursesService } from "./student-courses.service";

@Controller('student-courses')
export class StudentCoursesController{
    constructor(private studentCoursesService: StudentCoursesService){}

    @Post('add')
    create(@Body() dto: StudentCoursesDto){
        return this.studentCoursesService.create(dto)
    } 
    @Get()
    findAll() {
        return this.studentCoursesService.findAll()
    }

    @Get(':studentCode/:courseLecturer/:courseSchedule/:courseSeason/:courseStartTerm')
    findCourseOfStudent( @Param('studentCode') studentCode,
    @Param('courseLecturer') courseLecturer,
    @Param('courseSchedule') courseSchedule,
    @Param('courseSeason') courseSeason,
    @Param('courseStartTerm') courseStartTerm){
        return this.studentCoursesService.findCourseOfStudent(studentCode,courseLecturer,courseSchedule,courseSeason,courseStartTerm)

    }

    @Get(':studentCode')
    findAllCoursesOfStudent( @Param('studentCode') studentCode){
        return this.studentCoursesService.findAllCoursesOfStudent(studentCode)

    }

    @Get(':courseLecturer/:courseSchedule/:courseSeason/:courseStartTerm')
    findCourseStudents(
    @Param('courseLecturer') courseLecturer,
    @Param('courseSchedule') courseSchedule,
    @Param('courseSeason') courseSeason,
    @Param('courseStartTerm') courseStartTerm){
        return this.studentCoursesService.findCourseStudents(courseLecturer,courseSchedule,courseSeason,courseStartTerm)

    }


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