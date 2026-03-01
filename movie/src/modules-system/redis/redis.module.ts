import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { DATABASE_REDIS } from 'src/common/constant/app.constant';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      stores: [new KeyvRedis(DATABASE_REDIS as string)],
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
