import { Body, Controller, Post, Put } from '@nestjs/common';
import { CapNhatThongTinNguoiDungService } from './cap-nhat-thong-tin-nguoi-dung.service';
import { CapNhatThongTinNguoiDungDto } from './dto/cap-nhat-thong-tin-nguoi-dung.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('QuanLyNguoiDung')
export class CapNhatThongTinNguoiDungController {
  constructor(
    private readonly capNhatThongTinNguoiDungService: CapNhatThongTinNguoiDungService,
  ) {}

  @Put('CapNhatThongTinNguoiDung')
  async capNhatThongTinNguoiDungPut(
    @User() currentUser: any,
    @Body() body: CapNhatThongTinNguoiDungDto,
  ) {
    return await this.capNhatThongTinNguoiDungService.capNhatThongTinNguoiDung(
      currentUser,
      body,
    );
  }

  @Post('CapNhatThongTinNguoiDung')
  async capNhatThongTinNguoiDungPost(
    @User() currentUser: any,
    @Body() body: CapNhatThongTinNguoiDungDto,
  ) {
    return await this.capNhatThongTinNguoiDungService.capNhatThongTinNguoiDung(
      currentUser,
      body,
    );
  }
}
