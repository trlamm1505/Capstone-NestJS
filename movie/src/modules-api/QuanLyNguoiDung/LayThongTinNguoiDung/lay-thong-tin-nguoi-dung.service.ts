import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class LayThongTinNguoiDungService {
  constructor(private prisma: PrismaService) {}

  async layThongTinNguoiDung(taiKhoan: string) {
    if (!taiKhoan) {
      throw new BadRequestException('Tài khoản không được để trống');
    }

    // Tìm user theo tài khoản
    const user = await (this.prisma as any).nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
      select: {
        tai_khoan: true,
        ho_ten: true,
        email: true,
        so_dt: true,
        ma_nhom: true,
        loai_nguoi_dung: true,
        status: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    return user;
  }
}
