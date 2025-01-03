// 导入依赖项
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from '@midwayjs/core';

/**
 * JWT策略类
 * 用于处理JWT认证
 */
@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // 注入JWT配置
  @Config('jwt')
  private jwtConfig = null;

  /**
   * 验证JWT令牌
   * @param payload - JWT令牌的有效负载
   * @returns JWT令牌的有效负载
   */
  async validate(payload) {
    // 返回JWT令牌的有效负载
    return payload;
  }

  /**
   * 获取策略选项
   * @returns 策略选项对象
   */
  getStrategyOptions(): any {
    return {
      // 使用JWT配置中的密钥
      secretOrKey: this?.jwtConfig?.secret,
      // 从请求头中提取JWT令牌
      jwtFromRequest: ExtractJwt?.fromAuthHeaderAsBearerToken?.(),
    };
  }
}
