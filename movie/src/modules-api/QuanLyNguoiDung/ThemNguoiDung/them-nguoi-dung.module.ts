import { Module } from '@nestjs/common';
import { ThemNguoiDungController } from './them-nguoi-dung.controller';
import { ThemNguoiDungService } from './them-nguoi-dung.service';

@Module({
  controllers: [ThemNguoiDungController],
  providers: [ThemNguoiDungService],
  exports: [ThemNguoiDungService],
})
export class ThemNguoiDungModule {}
