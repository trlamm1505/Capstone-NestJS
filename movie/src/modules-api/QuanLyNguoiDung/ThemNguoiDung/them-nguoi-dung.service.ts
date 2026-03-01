import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { ThemNguoiDungDto } from './dto/them-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ThemNguoiDungService {
  constructor(private prisma: PrismaService) {}

  async themNguoiDung(body: ThemNguoiDungDto) {
    const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
      body;

    // 1️⃣ Kiểm tra tài khoản đã tồn tại chưa
    const taiKhoanExists = await (this.prisma as any).nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (taiKhoanExists) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }

    // 2️⃣ Kiểm tra email đã tồn tại chưa
    const emailExists = await (this.prisma as any).nguoiDung.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new BadRequestException('Email đã được sử dụng');
    }

    // 3️⃣ Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(matKhau, 10);

    // 4️⃣ Tạo user mới
    const newUser = await (this.prisma as any).nguoiDung.create({
      data: {
        tai_khoan: taiKhoan,
        mat_khau: hashedPassword,
        email: email,
        so_dt: soDt || null,
        ma_nhom: maNhom,
        ho_ten: hoTen,
        loai_nguoi_dung: maLoaiNguoiDung,
        status: true,
      },
    });

    // 5️⃣ Trả về thông tin user (không trả về mật khẩu)
    const { mat_khau, ...userWithoutPassword } = newUser;

    return {
      message: 'Thêm người dùng thành công',
      ...userWithoutPassword,
    };
  }
}
