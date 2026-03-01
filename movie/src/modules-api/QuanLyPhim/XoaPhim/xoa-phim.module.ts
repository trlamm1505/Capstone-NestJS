import { Module } from '@nestjs/common';
import { XoaPhimController } from './xoa-phim.controller';
import { XoaPhimService } from './xoa-phim.service';

@Module({
  controllers: [XoaPhimController],
  providers: [XoaPhimService],
  exports: [XoaPhimService],
})
export class XoaPhimModule {}
