import { Controller, Post } from '@nestjs/common';
import { ThongTinTaiKhoanService } from './thong-tin-tai-khoan.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('QuanLyNguoiDung')
export class ThongTinTaiKhoanController {
  constructor(
    private readonly thongTinTaiKhoanService: ThongTinTaiKhoanService,
  ) {}

  @Post('ThongTinTaiKhoan')
  async thongTinTaiKhoan(@User() user: any) {
    return await this.thongTinTaiKhoanService.thongTinTaiKhoan(user);
  }
}
