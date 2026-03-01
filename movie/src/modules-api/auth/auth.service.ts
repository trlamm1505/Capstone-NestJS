import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/modules-system/token/token.service';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async login(body: LoginDto) {
    const { taiKhoan, matKhau } = body;

    // 1️⃣ Tìm user theo tài khoản (string)
    const userExists = await (this.prisma as any).nguoiDung.findUnique({
      where: { tai_khoan: taiKhoan },
    });

    if (!userExists) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    // 2️⃣ Kiểm tra có mật khẩu hay không
    if (!userExists.mat_khau) {
      throw new BadRequestException(
        'Tài khoản này chưa có mật khẩu, vui lòng liên hệ admin',
      );
    }
    
    // 3️⃣ So sánh mật khẩu
    const isPasswordValid = bcrypt.compareSync(matKhau, userExists.mat_khau);

    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu không chính xác');
    }

    // 4️⃣ Tạo token (dùng tai_khoan làm userId và thêm loai_nguoi_dung)
    const tokens = this.tokenService.createTokens(
      userExists.tai_khoan,
      userExists.loai_nguoi_dung,
    );

    return tokens;
  }

  async refreshToken(body: RefreshTokenDto) {
    const { refreshToken } = body;

    try {
      // 1️⃣ Verify refresh token
      const payload = this.tokenService.verifyRefreshToken(refreshToken);

      // 2️⃣ Lấy taiKhoan từ payload
      const taiKhoan = (payload as any).taiKhoan;

      // 3️⃣ Kiểm tra user còn tồn tại trong database không
      const userExists = await (this.prisma as any).nguoiDung.findUnique({
        where: { tai_khoan: taiKhoan },
      });

      if (!userExists) {
        throw new UnauthorizedException('Người dùng không tồn tại');
      }

      // 4️⃣ Lấy thông tin user để tạo tokens mới
      const newTokens = this.tokenService.createTokens(
        taiKhoan,
        userExists.loai_nguoi_dung,
      );

      return newTokens;
    } catch (error) {
      // Nếu refresh token không hợp lệ hoặc hết hạn
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }

  async register(body: RegisterDto) {
    const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = body;

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
        loai_nguoi_dung: 'user', // Mặc định là user
        status: true, // Mặc định là 1 (true)
      },
    });

    // 5️⃣ Trả về thông tin user (không trả về mật khẩu, loai_nguoi_dung, status)
    const { mat_khau, loai_nguoi_dung, status, ...userResponse } = newUser;

    return userResponse;
  }
}
