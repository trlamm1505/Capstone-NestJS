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

export class CapNhatPhimDto {
  @IsNotEmpty({ message: 'Mã phim là bắt buộc để xác định phim cần cập nhật' })
  @Type(() => Number)
  @IsInt({ message: 'Mã phim phải là số nguyên' })
  @Min(1000, { message: 'Mã phim phải có đúng 4 chữ số (1000 - 9999)' })
  @Max(9999, { message: 'Mã phim phải có đúng 4 chữ số (1000 - 9999)' })
  maPhim!: number;

  @IsOptional()
  @IsString()
  tenPhim?: string;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsString()
  hinhAnh?: string;

  @IsOptional()
  @IsString()
  moTa?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsDateString({}, { message: 'Ngày khởi chiếu không đúng định dạng (YYYY-MM-DD)' })
  ngayKhoiChieu?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: 'Đánh giá phải là số nguyên' })
  @Min(1, { message: 'Đánh giá tối thiểu là 1' })
  @Max(5, { message: 'Đánh giá tối đa là 5' })
  danhGia?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '') return undefined;
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'hot phải là true hoặc false' })
  hot?: boolean;
}
