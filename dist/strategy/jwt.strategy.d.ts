declare const JwtStrategy_base: new (...args: any[]) => import("@midwayjs/passport/dist/passport/strategy").AbstractStrategyWrapper;
/**
 * JWT策略类
 * 用于处理JWT认证
 */
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtConfig;
    /**
     * 验证JWT令牌
     * @param payload - JWT令牌的有效负载
     * @returns JWT令牌的有效负载
     */
    validate(payload: any): Promise<any>;
    /**
     * 获取策略选项
     * @returns 策略选项对象
     */
    getStrategyOptions(): any;
}
export {};
