import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TaoLichChieuDto {
  @Type(() => Number)
  @IsInt({ message: 'Mã phim phải là số nguyên' })
  @Min(1, { message: 'Mã phim phải lớn hơn 0' })
  maPhim!: number;

  @IsString()
  @IsNotEmpty({ message: 'Ngày chiếu giờ chiếu không được để trống' })
  ngayChieuGioChieu!: string;

  @Type(() => Number)
  @IsInt({ message: 'Mã rạp phải là số nguyên' })
  @Min(1, { message: 'Mã rạp phải lớn hơn 0' })
  maRap!: number;

  @Type(() => Number)
  @IsInt({ message: 'Giá vé phải là số nguyên' })
  @Min(1, { message: 'Giá vé phải lớn hơn 0' })
  giaVe!: number;
}
