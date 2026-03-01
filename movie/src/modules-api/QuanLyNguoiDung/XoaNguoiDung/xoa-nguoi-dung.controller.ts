import { Controller, Delete, Query } from '@nestjs/common';
import { XoaNguoiDungService } from './xoa-nguoi-dung.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('QuanLyNguoiDung')
export class XoaNguoiDungController {
  constructor(private readonly xoaNguoiDungService: XoaNguoiDungService) {}

  @Delete('XoaNguoiDung')
  async xoaNguoiDung(
    @User() currentUser: any,
    @Query('taiKhoan') taiKhoan: string,
  ) {
    return await this.xoaNguoiDungService.xoaNguoiDung(currentUser, taiKhoan);
  }
}
