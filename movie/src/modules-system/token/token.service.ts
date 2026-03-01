import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';

@Injectable()
export class TokenService {
  createTokens(taiKhoan, loaiNguoiDung?: string) {
    const payload: any = { taiKhoan: taiKhoan };
    
    // Nếu có loaiNguoiDung thì thêm vào payload
    if (loaiNguoiDung) {
      payload.loaiNguoiDung = loaiNguoiDung;
    }

    const accessToken = jsonwebtoken.sign(
      payload,
      ACCESS_TOKEN_SECRET as string,
      { expiresIn: '15m' }, // 15 phút
    );
    const refreshToken = jsonwebtoken.sign(
      payload,
      REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }, // 7 ngày
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  verifyAccessToken(accessToken: string, options?: jsonwebtoken.VerifyOptions) {
    const decode = jsonwebtoken.verify(
      accessToken,
      ACCESS_TOKEN_SECRET as string,
      options,
    );
    return decode;
  }

  verifyRefreshToken(refreshToken) {
    const decode = jsonwebtoken.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET as string,
    );
    return decode;
  }
}
