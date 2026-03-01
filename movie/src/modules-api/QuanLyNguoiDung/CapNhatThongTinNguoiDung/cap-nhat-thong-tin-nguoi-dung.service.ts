import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CapNhatThongTinNguoiDungDto } from './dto/cap-nhat-thong-tin-nguoi-dung.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CapNhatThongTinNguoiDungService {
  constructor(private prisma: PrismaService) {}

  async capNhatThongTinNguoiDung(
    currentUser: any,
    body: CapNhatThongTinNguoiDungDto,
  ) {
    const { taiKhoan, matKhau, email, soDt, maNhom, maLoaiNguoiDung, hoTen } =
      body;

    // 1️⃣ Kiểm tra quyền: User chỉ được cập nhật chính mình, Admin được cập nhật bất kỳ
    if (currentUser.loai_nguoi_dung !== 'admin') {
      // Nếu không phải admin, chỉ được cập nhật chính mình
      if (currentUser.tai_khoan !== taiKhoan) {
        throw new ForbiddenException(
          'Bạn chỉ có thể cập nhật thông tin của chính mình',
        );
      }
    }

    // 2️⃣ Kiểm tra user cần cập nhật có tồn tại không
    const userExists = await (this.prisma as any).nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!userExists) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    // 3️⃣ Kiểm tra email mới có bị trùng không (nếu có thay đổi email)
    if (email && email !== userExists.email) {
      const emailExists = await (this.prisma as any).nguoiDung.findUnique({
        where: { email },
      });

      if (emailExists) {
        throw new BadRequestException('Email đã được sử dụng');
      }
    }

    // 4️⃣ Chuẩn bị data cập nhật (chỉ update trường được gửi)
    const updateData: any = {};

    // Chỉ thêm trường nào được gửi
    if (email !== undefined) updateData.email = email;
    if (soDt !== undefined) updateData.so_dt = soDt || null;
    if (maNhom !== undefined) updateData.ma_nhom = maNhom;
    if (hoTen !== undefined) updateData.ho_ten = hoTen;

    // 5️⃣ Chỉ admin mới được thay đổi loai_nguoi_dung
    if (maLoaiNguoiDung !== undefined) {
      if (currentUser.loai_nguoi_dung === 'admin') {
        updateData.loai_nguoi_dung = maLoaiNguoiDung;
      } else {
        // User thường không được thay đổi loại người dùng
        throw new ForbiddenException(
          'Bạn không có quyền thay đổi loại người dùng',
        );
      }
    }

    // 6️⃣ Nếu có mật khẩu mới, hash và cập nhật
    if (matKhau && matKhau.trim() !== '') {
      updateData.mat_khau = bcrypt.hashSync(matKhau, 10);
    }

    // 7️⃣ Cập nhật user
    const updatedUser = await (this.prisma as any).nguoiDung.update({
      where: { tai_khoan: taiKhoan },
      data: updateData,
    });

    // 8️⃣ Trả về thông tin user (không trả về mật khẩu)
    const { mat_khau, ...userWithoutPassword } = updatedUser;

    return {
      message: 'Cập nhật thành công',
      ...userWithoutPassword,
    };
  }
}
