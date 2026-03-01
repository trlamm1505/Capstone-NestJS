import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ThemNguoiDungService } from './them-nguoi-dung.service';
import { ThemNguoiDungDto } from './dto/them-nguoi-dung.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@UseGuards(RolesGuard)
export class ThemNguoiDungController {
  constructor(private readonly themNguoiDungService: ThemNguoiDungService) {}

  @Post('ThemNguoiDung')
  @Roles('admin') // Chỉ admin mới được thêm user
  async themNguoiDung(@Body() body: ThemNguoiDungDto) {
    return await this.themNguoiDungService.themNguoiDung(body);
  }
}
