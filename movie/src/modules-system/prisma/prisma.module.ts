import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService], // do có decorator injectable
  exports: [PrismaService] // mang qua nơi khác sài
})
export class PrismaModule {}
