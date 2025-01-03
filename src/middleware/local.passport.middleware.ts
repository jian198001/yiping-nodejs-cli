// 导入依赖项
import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';

/**
 * 本地认证中间件类
 * 继承自PassportMiddleware，并使用LocalStrategy进行本地认证
 */
@Middleware()
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  /**
   * 获取认证选项
   * @returns 认证选项对象
   */
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      // 认证失败时重定向的URL
      failureRedirect: '/staff/web/frontPage/passport/loginError.json',
    };
  }
}
