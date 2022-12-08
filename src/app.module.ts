import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { CareerModule } from './career/career.module';
import { RoleModule } from './role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeasonModule } from './season/season.module';

@Module({
  imports: [CourseModule, UserModule, AuthModule, CareerModule, RoleModule, PrismaModule, SeasonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
