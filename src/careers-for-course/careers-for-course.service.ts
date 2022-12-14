import { Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
import { CareersForCourseDto } from "./dto";
import { ForbiddenException } from '@nestjs/common/exceptions';


@Injectable()
export class CareersForCourseService{
    constructor(private prisma: PrismaService){}

        async create(dto: CareersForCourseDto){
            try {
                const careerForCourse=
                await this.prisma.careersForCourse.create({
                    data: {
                        courseLecturer: dto.courseLecturer,
                        courseSchedule: dto.courseSchedule, 
                        courseStartTerm: dto.courseStartTerm, 
                        courseSeason: dto.courseSeason, 
                        careerId: parseInt(dto.careerId.toString())
                    },
                });
                return careerForCourse;
            }catch(error){
                if(error instanceof PrismaClientKnownRequestError) {
                    if(error.code === 'P2002'){
                        throw new ForbiddenException(
                            'This career already exists for this course.'
                        );
                    }
                }
                throw error;
            }
        }
        findAll(){
            return this.prisma.careersForCourse.findMany({})
        }

        findAllCareersOfOneCourse(lecturer: string,
            schedule: string,
             startTerm: number,
              season: string){
                return this.prisma.careersForCourse.findMany({
                    where:{
                            courseLecturer: lecturer,
                            courseSchedule: schedule,
                            courseStartTerm: parseInt(startTerm.toString()),
                            courseSeason :season
                    }
                })
              }
        
        findAllCoursesOfOneCareer(career:number){
            return this.prisma.careersForCourse.findMany({
                where: {
                    careerId: parseInt(career.toString()),
                }
            })
        }

        async delete(lecturer: string,
             schedule: string,
              startTerm: number,
               season: string,
                career: number){
                    const careerForCourse = 
                    await this.prisma.careersForCourse.findMany({
                        where: {
                            courseLecturer: lecturer,
                            courseSchedule: schedule,
                            courseStartTerm: parseInt(startTerm.toString()),
                            courseSeason :season,
                            careerId: parseInt(career.toString()),
                        },
                    });

                    if(!careerForCourse){
                        throw new ForbiddenException(
                            "This course doesn't have this career enlisted."
                        );
                    }

                    return this.prisma.careersForCourse.deleteMany({
                        where:{
                            courseLecturer: lecturer,
                            courseSchedule: schedule,
                            courseStartTerm: parseInt(startTerm.toString()),
                            courseSeason :season,
                            careerId: parseInt(career.toString()),
                        }
                    })

                }
    
}

