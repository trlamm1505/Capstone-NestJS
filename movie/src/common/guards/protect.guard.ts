import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenService } from 'src/modules-system/token/token.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // nếu hàm canActivate return false sẽ luôn luôn trả về 403
    // nếu muốn kiểm soát mã trả về thì chủ động: throw new NotFoundException()
    // return false

    // lấy cờ isPublic trong mọi api để xem xem có được đánh true hay không
    // nếu cờ đánh true thì hàm canActivate return true
    // nếu cờ không đánh undefine => cho code chạy tiếp đi kiểm tra
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passsed in the JwtModule
      const payload = await this.tokenService.verifyAccessToken(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      // console.log({ payload });

      // prisma client uses the Vietnamese model name `nguoiDung` (tai_khoan PK)
      const userExits = await (this.prisma as any).nguoiDung.findUnique({
        where: {
          tai_khoan: (payload as any).taiKhoan,
        },
      });
      if (!userExits) {
        throw new UnauthorizedException('Không tìm thấy user');
      }

      request['user'] = userExits;
    } catch (err) {
      console.log(`[ProtectGuard] - `, err);
      switch (err.constructor) {
        case TokenExpiredError:
          // token hết hạn: 403 (FE gọi api refresh-token)
          throw new ForbiddenException(err.message);

        default:
          // mọi lỗi còn lại của token: 401 (FE - logout)
          throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
