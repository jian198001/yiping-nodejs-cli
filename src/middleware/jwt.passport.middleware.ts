// 导入依赖项
import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

/**
 * JWT认证中间件类
 * 继承自PassportMiddleware，并使用JwtStrategy进行JWT认证
 */
@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  /**
   * 获取认证选项
   * @returns 认证选项对象
   */
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }
}
