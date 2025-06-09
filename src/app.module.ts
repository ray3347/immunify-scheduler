import { Module } from '@nestjs/common';
import { CronModule } from './module/CronModule';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ScheduleModule.forRoot(), CronModule]
})
export class AppModule {}
