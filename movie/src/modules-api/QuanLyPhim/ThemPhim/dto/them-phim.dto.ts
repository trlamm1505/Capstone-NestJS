import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ThemPhimDto {
  @Type(() => Number)
  @IsInt({ message: 'Mã phim phải là số nguyên' })
  @Min(1000, { message: 'Mã phim phải có đúng 4 chữ số (1000 - 9999)' })
  @Max(9999, { message: 'Mã phim phải có đúng 4 chữ số (1000 - 9999)' })
  maPhim!: number;

  @IsString()
  @IsNotEmpty({ message: 'Tên phim không được để trống' })
  tenPhim!: string;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsNotEmpty({ message: 'Ngày khởi chiếu không được để trống' })
  @IsDateString({}, { message: 'Ngày khởi chiếu không đúng định dạng (YYYY-MM-DD)' })
  ngayKhoiChieu!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Đánh giá phải là số nguyên' })
  @Min(1, { message: 'Đánh giá tối thiểu là 1' })
  @Max(5, { message: 'Đánh giá tối đa là 5' })
  danhGia?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'hot phải là true hoặc false' })
  hot?: boolean;
}
