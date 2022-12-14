import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, isNumber, IsString, Max, Min } from "class-validator";


export class StudentCoursesDto {
    @IsNotEmpty()
    @IsString()
    studentCode: string

    @IsNotEmpty()
    @IsString()
    courseLecturer: string

    @IsNotEmpty()
    @IsString()
    courseSchedule: string

    @IsNotEmpty()
    @IsString()
    courseSeason: string

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(12)
    @IsInt()
    courseStartTerm:number
}