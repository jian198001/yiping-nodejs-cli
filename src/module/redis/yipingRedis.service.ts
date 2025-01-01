import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';

import { RedisService } from '@midwayjs/redis';

@Provide()
export class YipingRedisService extends BaseService {
  @Inject()
  private redisService: RedisService = null;

  public async setObj(key: string, val: string): Promise<void> {
    await this?.redisService.set(key, val);
  }
}
