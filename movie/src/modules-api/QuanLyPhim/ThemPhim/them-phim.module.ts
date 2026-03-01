import { Module } from '@nestjs/common';
import { ThemPhimController } from './them-phim.controller';
import { ThemPhimService } from './them-phim.service';

@Module({
  controllers: [ThemPhimController],
  providers: [ThemPhimService],
  exports: [ThemPhimService],
})
export class ThemPhimModule {}
