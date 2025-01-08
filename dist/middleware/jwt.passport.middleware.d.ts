import { AuthenticateOptions } from '@midwayjs/passport';
declare const JwtPassportMiddleware_base: new (...args: any[]) => import("@midwayjs/passport").AbstractPassportMiddleware;
/**
 * JWT认证中间件类
 * 继承自PassportMiddleware，并使用JwtStrategy进行JWT认证
 */
export declare class JwtPassportMiddleware extends JwtPassportMiddleware_base {
    /**
     * 获取认证选项
     * @returns 认证选项对象
     */
    getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions;
}
export {};
