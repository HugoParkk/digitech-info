import { Controller, Get, Post } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  getTodayInfo() {
    return this.infoService.getTodayInfo();
  }

  @Post()
  postTodayInfo() {
    return this.infoService.postTodayInfo();
  }

  @Get('/tomorrow')
  getTomorrowInfo() {
    return this.infoService.getTomorrowInfo();
  }

  @Post('/tomorrow')
  postTomorrowInfo() {
    return this.infoService.postTomorrowInfo();
  }
}
