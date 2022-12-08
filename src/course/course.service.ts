import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CourseDto } from "./dto";

@Injectable()
export class CourseService{
    constructor(private prisma: PrismaService){}

    async create(dto: CourseDto) {
        try {
            const course = 
            await this.prisma.course.create({
            data:  {
                name: dto.name,
                startTerm : parseInt(dto.startTerm.toString()) ,
                endTerm : parseInt(dto.endTerm.toString()),
                schedule :  dto.schedule,
                lecturer : dto.lecturer,
                credits : parseInt(dto.credits.toString()),
                ownerUsername : dto.ownerUsername,
                seasonName : dto.seasonName,
            },
        });
        return course;
        } catch (error){
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'This course already exists'
                    );
                }
            }
            throw error;
        }
        

    }
    
    async update(lecturerData:string, scheduleData:string, termData: number, seasonData:string, dto: CourseDto) {
        const course = 
        await this.prisma.course.findFirst({
            where: {
                lecturer: lecturerData,
                schedule: scheduleData,
                startTerm: parseInt(termData.toString()),
                seasonName: seasonData,
                
            },
        });


        if(!course) {
            throw new ForbiddenException(
                'This course does not exist.',
            );
        }
    

        
    return this.prisma.course.updateMany({
        where: { 
            schedule: scheduleData,
            lecturer: lecturerData,
            startTerm: parseInt(termData.toString()),
            seasonName: seasonData,
        },
        data: {
            name: dto.name,
            startTerm : parseInt(dto.startTerm.toString()) ,
            endTerm : parseInt(dto.endTerm.toString()),
            schedule :  dto.schedule,
            lecturer : dto.lecturer,
            credits : parseInt(dto.credits.toString()),
            ownerUsername : dto.ownerUsername,
            seasonName : dto.seasonName,
        },
      });
    }

    findAll() {
        return this.prisma.course.findMany({});
    }

    find(lecturerData:string, scheduleData:string, termData: number, seasonData:string,){
        return this.prisma.course.findFirst({
            where: {
                lecturer: lecturerData,
                schedule: scheduleData,
                startTerm: parseInt(termData.toString()),
                seasonName: seasonData,
            },
        });
    }

    async delete(lecturerData:string, scheduleData:string, termData: number,seasonData:string,){
        const course = 
        await this.prisma.course.findMany({
            where: {
                lecturer: lecturerData,
                schedule: scheduleData,
                startTerm: parseInt(termData.toString()),
                seasonName: seasonData,
            },
        });


        if(!course) {
            throw new ForbiddenException(
                'This course does not exist.',
            );
        }
    

    
        return this.prisma.course.deleteMany({
        where: {
            lecturer: lecturerData, 
            schedule: scheduleData,
            startTerm: parseInt(termData.toString()),
            seasonName: seasonData,
        },
      });

      
    }
    
}