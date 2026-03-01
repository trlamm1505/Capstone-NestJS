import { Module } from '@nestjs/common';
import { XoaNguoiDungController } from './xoa-nguoi-dung.controller';
import { XoaNguoiDungService } from './xoa-nguoi-dung.service';

@Module({
  controllers: [XoaNguoiDungController],
  providers: [XoaNguoiDungService],
  exports: [XoaNguoiDungService],
})
export class XoaNguoiDungModule {}
