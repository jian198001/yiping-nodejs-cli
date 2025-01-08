import { AuthenticateOptions } from '@midwayjs/passport';
declare const LocalPassportMiddleware_base: new (...args: any[]) => import("@midwayjs/passport").AbstractPassportMiddleware;
/**
 * 本地认证中间件类
 * 继承自PassportMiddleware，并使用LocalStrategy进行本地认证
 */
export declare class LocalPassportMiddleware extends LocalPassportMiddleware_base {
    /**
     * 获取认证选项
     * @returns 认证选项对象
     */
    getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions;
}
export {};
