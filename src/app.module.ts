import { Module } from '@nestjs/common';
import { InfoController } from './info/info.controller';
import { InfoService } from './info/info.service';

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [InfoService],
})
export class AppModule {}
