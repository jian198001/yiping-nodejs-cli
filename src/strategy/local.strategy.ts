// 导入依赖项
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Inject, Logger } from '@midwayjs/decorator';
import { Strategy } from 'passport-local';
import { JwtService } from '@midwayjs/jwt';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { ILogger } from '@midwayjs/core';
import { Zero0Error } from '../module/common/model/Zero0Error';
import { User } from '../module/common/model/User';

const crypto: any = require('../module/common/utils/crypto');

/**
 * 本地策略类
 * 用于处理本地用户认证
 */
@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 注入User实体的Repository
  @InjectEntityModel(User)
  private repository: Repository<User> = null;

  // 注入JwtService
  @Inject()
  private jwtService: JwtService = null;

  /**
   * 验证用户凭据
   * @param username - 用户名
   * @param password - 密码
   * @returns 包含JWT令牌的对象
   */
  async validate(username, password) {
    let log = '';

    console?.log?.(username, password);

    const pwd = crypto?.md5?.(password);

    const users: User[] = await this?.repository?.findBy({
      username: username,
      password: pwd,
    });

    console?.log?.(users);

    if (!users || users?.length < 1) {
      log = '用户名或密码错误';

      const zero0Error: Zero0Error = new Zero0Error(log, '401');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const user = users?.[0];

    if (!user) {
      log = '用户名或密码错误';

      const zero0Error: Zero0Error = new Zero0Error(log, '401');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    const payload: any = { id: user?.id };

    const token: string = this?.jwtService?.signSync?.(payload, 'yiping', {
      expiresIn: '999999d',
    });

    return {
      token,
    };
  }

  /**
   * 获取策略选项
   * @returns 策略选项对象
   */
  getStrategyOptions(): any {
    return {};
  }
}
