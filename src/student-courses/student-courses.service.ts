import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { create } from "domain";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentCoursesDto } from "./dto";

@Injectable()
export class StudentCoursesService{
    constructor(private prisma: PrismaService){}
        async create(dto:StudentCoursesDto){
            try {
                const studentCourse= 
                await this.prisma.studentCourses.create({
                    data: {
                        studentCode: dto.studentCode,
                        courseLecturer: dto.courseLecturer,
                        courseSchedule: dto.courseSchedule,
                        courseSeason: dto.courseSeason,
                        courseStartTerm: dto.courseStartTerm
                    },
                });
                return studentCourse;
            }catch(error){
                if(error instanceof PrismaClientKnownRequestError){
                    if(error.code == 'P2002'){
                        throw new ForbiddenException(
                            'This student is already enrolled to this course.'
                        );
                    }
                }
                throw error;
            }
        }
    
    findAll() {
        return this.prisma.studentCourses.findMany({})
    }

    findCourseOfStudent(code:string,lecturer:string, schedule:string, season:string, term:number){
        return this.prisma.studentCourses.findFirst({
            where: {
                studentCode:code,
                courseLecturer: lecturer,
                courseSchedule:schedule,
                courseSeason:season,
                courseStartTerm:parseInt(term.toString())
            }
        })
    }

    findAllCoursesOfStudent(code:string){
        return this.prisma.studentCourses.findMany({
            where:{
                studentCode:code
            }
        })
    }

    findCourseStudents(lecturer:string, schedule:string, season:string, term:number){
        return this.prisma.studentCourses.findMany({
            where:{
                courseLecturer: lecturer,
                courseSchedule:schedule,
                courseSeason:season,
                courseStartTerm:parseInt(term.toString())
            }
        })

    }


    async delete(code:string,lecturer:string, schedule:string, season:string, term:number){
        const studentCourse = 
        await this.prisma.studentCourses.findMany({
            where: {
                studentCode:code,
                courseLecturer: lecturer,
                courseSchedule:schedule,
                courseSeason:season,
                courseStartTerm:parseInt(term.toString())
            },
        });

        if(!studentCourse){
            throw new ForbiddenException(
                "This student is not enrolled to his course."
            );
        }

        return this.prisma.studentCourses.deleteMany({
            where:{
                studentCode:code,
                courseLecturer: lecturer,
                courseSchedule:schedule,
                courseSeason:season,
                courseStartTerm:parseInt(term.toString())
            }

        })
    }
    
}