import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CapNhatThongTinNguoiDungDto {
  @IsString()
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  taiKhoan!: string;

  @IsOptional()
  @IsString()
  matKhau?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsOptional()
  @IsString()
  soDt?: string;

  @IsOptional()
  @IsString()
  @Matches(/^GP\d{2}$/, { message: 'Mã nhóm phải theo định dạng GPxx (VD: GP01, GP10)' })
  maNhom?: string;

  @IsOptional()
  @IsString()
  maLoaiNguoiDung?: string;

  @IsOptional()
  @IsString()
  hoTen?: string;
}
