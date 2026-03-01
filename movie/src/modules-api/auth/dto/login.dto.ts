import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  taiKhoan!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  matKhau!: string;
}
