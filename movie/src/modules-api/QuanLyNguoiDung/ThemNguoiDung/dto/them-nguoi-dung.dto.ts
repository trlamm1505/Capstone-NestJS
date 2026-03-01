import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class ThemNguoiDungDto {
  @IsString()
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  taiKhoan!: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  matKhau!: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email!: string;

  @IsOptional()
  @IsString()
  soDt?: string;

  @IsString()
  @IsNotEmpty({ message: 'Mã nhóm không được để trống' })
  @Matches(/^GP\d{2}$/, { message: 'Mã nhóm phải theo định dạng GPxx (VD: GP01, GP10)' })
  maNhom!: string;

  @IsString()
  @IsNotEmpty({ message: 'Loại người dùng không được để trống' })
  maLoaiNguoiDung!: string;

  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  hoTen!: string;
}
