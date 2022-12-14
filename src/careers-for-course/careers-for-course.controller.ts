import { Controller, Post, Delete, Body, Get, Param } from "@nestjs/common";
import { CareersForCourseService } from "./careers-for-course.service";
import { CareersForCourseDto } from "./dto";

@Controller('course-career')
export class CareersForCourseController{
    constructor(private careerForCourseService: CareersForCourseService){}
    @Post('add')
    create(@Body() dto:CareersForCourseDto){
        return this.careerForCourseService.create(dto)
    }

    @Get()
    findAll(){
        return this.careerForCourseService.findAll()
    }

    @Get(':courseLecturer/:courseSchedule/:courseStartTerm/:courseSeason')
    findAllCareersOfOneCourse(@Param('courseLecturer') courseLecturer,
    @Param('courseSchedule') courseSchedule,
    @Param('courseStartTerm') courseStartTerm,
    @Param('courseSeason' ) courseSeason,){
        return this.careerForCourseService.findAllCareersOfOneCourse(courseLecturer, courseSchedule, courseStartTerm, courseSeason)
    }

    @Get(':careerId')
    findAllCoursesOfOneCareer(@Param('careerId') careerId){
        return this.careerForCourseService.findAllCoursesOfOneCareer(careerId)
    }


    @Delete(':courseLecturer/:courseSchedule/:courseStartTerm/:courseSeason/:careerId')
    delete(
        @Param('courseLecturer') courseLecturer,
        @Param('courseSchedule') courseSchedule,
        @Param('courseStartTerm') courseStartTerm,
        @Param('courseSeason' ) courseSeason,
        @Param('careerId') careerId
        ) {
            return this.careerForCourseService.delete(courseLecturer, courseSchedule, courseStartTerm, courseSeason, careerId)
        }



}