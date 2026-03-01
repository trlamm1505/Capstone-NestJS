import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class XoaNguoiDungService {
  constructor(private prisma: PrismaService) {}

  async xoaNguoiDung(currentUser: any, taiKhoan: string) {
    if (!taiKhoan) {
      throw new NotFoundException('Tài khoản không được để trống');
    }

    // 1️⃣ Kiểm tra quyền: User chỉ được xóa chính mình, Admin được xóa bất kỳ
    if (currentUser.loai_nguoi_dung !== 'admin') {
      // Nếu không phải admin, chỉ được xóa chính mình
      if (currentUser.tai_khoan !== taiKhoan) {
        throw new ForbiddenException('Bạn không có quyền xóa tài khoản này');
      }
    }

    // 2️⃣ Kiểm tra user có tồn tại không
    const userExists = await (this.prisma as any).nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!userExists) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    // 3️⃣ Xóa user
    await (this.prisma as any).nguoiDung.delete({
      where: { tai_khoan: taiKhoan },
    });

    // 4️⃣ Trả về message
    return {
      message: 'Xóa người dùng thành công',
      taiKhoan: taiKhoan,
    };
  }
}
