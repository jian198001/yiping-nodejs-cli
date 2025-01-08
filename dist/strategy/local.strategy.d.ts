declare const LocalStrategy_base: new (...args: any[]) => import("@midwayjs/passport/dist/passport/strategy").AbstractStrategyWrapper;
/**
 * 本地策略类
 * 用于处理本地用户认证
 */
export declare class LocalStrategy extends LocalStrategy_base {
    private logger;
    private repository;
    private jwtService;
    /**
     * 验证用户凭据
     * @param username - 用户名
     * @param password - 密码
     * @returns 包含JWT令牌的对象
     */
    validate(username: any, password: any): Promise<{
        token: string;
    }>;
    /**
     * 获取策略选项
     * @returns 策略选项对象
     */
    getStrategyOptions(): any;
}
export {};
