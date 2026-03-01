import { Module } from '@nestjs/common';
import { ThongTinTaiKhoanController } from './thong-tin-tai-khoan.controller';
import { ThongTinTaiKhoanService } from './thong-tin-tai-khoan.service';

@Module({
  controllers: [ThongTinTaiKhoanController],
  providers: [ThongTinTaiKhoanService],
  exports: [ThongTinTaiKhoanService],
})
export class ThongTinTaiKhoanModule {}
