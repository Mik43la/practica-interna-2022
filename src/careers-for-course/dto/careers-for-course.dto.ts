import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Type } from 'class-transformer';


export class CareersForCourseDto {

    @IsNotEmpty()
    @IsString()
    courseLecturer: string;
    
    @IsNotEmpty()
    @IsString()
    courseSchedule: string;

    
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(12)
    @IsInt()
    courseStartTerm: number;

    @IsNotEmpty()
    @IsString()
    courseSeason: string;

    @IsNotEmpty()
    @IsString()
    careerId: string;
        
}