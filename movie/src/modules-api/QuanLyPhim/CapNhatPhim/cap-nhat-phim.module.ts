import { Module } from '@nestjs/common';
import { CapNhatPhimController } from './cap-nhat-phim.controller';
import { CapNhatPhimService } from './cap-nhat-phim.service';

@Module({
  controllers: [CapNhatPhimController],
  providers: [CapNhatPhimService],
  exports: [CapNhatPhimService],
})
export class CapNhatPhimModule {}
