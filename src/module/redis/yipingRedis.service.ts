// 导入依赖项
import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';

import { RedisService } from '@midwayjs/redis';

/**
 * 自定义Redis服务类
 * 提供设置Redis键值对的功能
 */
@Provide()
export class YipingRedisService extends BaseService {
  // 注入RedisService
  @Inject()
  private redisService: RedisService = null;

  /**
   * 设置Redis键值对
   * @param key - 键
   * @param val - 值
   * @returns 无返回值
   */
  public async setObj(key: string, val: string): Promise<void> {
    // 设置Redis键值对
    await this?.redisService.set(key, val);
  }
}
