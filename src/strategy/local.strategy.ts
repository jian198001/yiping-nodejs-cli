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

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Logger()
  private logger: ILogger = null

  @InjectEntityModel(User)
  private repository: Repository<User> = null;

  @Inject()
  private jwtService: JwtService = null;

  // 策略的验证
  async validate(username, password) {
    let log = '';

    console.log(username, password);

    const pwd = crypto?.md5?.(password)

    const users: User[] = await this?.repository?.findBy({username: username, password: pwd, })

    console.log(users);
    

    if (!users || users?.length < 1) {
      
      log = '用户名或密码错误';

      const zero0Error: Zero0Error = new Zero0Error(log, '401');
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const user = users?.[0]

    if (!user) {
      log = '用户名或密码错误';

      const zero0Error: Zero0Error = new Zero0Error(log, '401');
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const payload: any = { id: user?.id };

    const token: string = this?.jwtService?.signSync?.(payload, 'yiping', {
      expiresIn: '999999d',
    });

    return {
      token,
    };
  }

  // 当前策略的构造器参数
  getStrategyOptions(): any {
    return {};
  }
}
