import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('DangNhap')
  @Public()
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('DangKy')
  @Public()
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('RefreshToken')
  @Public()
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body);
  }
}
