import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';

export class VeDto {
  @Type(() => Number)
  @IsInt({ message: 'Mã ghế phải là số nguyên' })
  @Min(1, { message: 'Mã ghế phải lớn hơn 0' })
  maGhe!: number;

  @Type(() => Number)
  @IsInt({ message: 'Giá vé phải là số nguyên' })
  @Min(1, { message: 'Giá vé phải lớn hơn 0' })
  giaVe!: number;
}

export class DatVeDto {
  @Type(() => Number)
  @IsInt({ message: 'Mã lịch chiếu phải là số nguyên' })
  @Min(1, { message: 'Mã lịch chiếu phải lớn hơn 0' })
  maLichChieu!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeDto)
  danhSachVe!: VeDto[];
}
