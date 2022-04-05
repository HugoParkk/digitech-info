import { Module } from '@nestjs/common';
import { InfoController } from './info/info.controller';
import { InfoService } from './info/info.service';
import { TimetableController } from './timetable/timetable.controller';
import { TimetableService } from './timetable/timetable.service';

@Module({
  imports: [],
  controllers: [InfoController, TimetableController],
  providers: [InfoService, TimetableService],
})
export class AppModule {}
