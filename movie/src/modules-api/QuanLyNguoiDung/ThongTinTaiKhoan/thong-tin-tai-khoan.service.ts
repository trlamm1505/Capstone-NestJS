import { Injectable } from '@nestjs/common';

@Injectable()
export class ThongTinTaiKhoanService {
  async thongTinTaiKhoan(user: any) {
    // User đã được inject bởi ProtectGuard
    // Loại bỏ mật khẩu trước khi trả về
    const { mat_khau, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
