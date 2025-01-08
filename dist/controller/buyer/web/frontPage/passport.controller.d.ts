import { Buyer } from '../../../../entity/Buyer';
/**
 * 买家Web前端页面认证控制器
 * 处理与买家认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
export declare class BuyerUniFrontPagePassportPassportController {
    private logger;
    private buyerService;
    private jwtService;
    private captchaService;
    /**
     * 买家登录
     * @param buyer - 买家对象
     * @param shopId - 店铺ID
     * @returns 返回登录结果，包括访问令牌、刷新令牌等
     */
    login(buyer: Buyer, shopId?: string): Promise<any>;
    /**
     * 微信小程序买家登录
     * @param code - 微信小程序登录凭证
     * @param shopId - 店铺ID
     * @returns 返回登录结果，包括访问令牌、刷新令牌等
     */
    loginWxma(code: string, shopId: any): Promise<any>;
    /**
     * 买家注册
     * @param buyer - 买家对象
     * @param shopId - 店铺ID
     * @returns 返回注册结果
     */
    reg(buyer: Buyer, shopId?: string): Promise<any>;
    /**
     * 买家登出
     * @param accessToken - 访问令牌
     * @returns 返回登出结果
     */
    logout(accessToken: string): Promise<any>;
    /**
     * 生成验证码图片
     * @returns 返回验证码图片数据
     */
    captchaImage(): Promise<any>;
    /**
     * 生成验证码公式
     * @returns 返回验证码公式数据
     */
    captchaFormula(): Promise<any>;
    /**
     * 验证验证码
     * @param id - 验证码ID
     * @param answer - 验证码答案
     * @returns 返回验证结果
     */
    checkCaptcha(id: string, answer: string): Promise<any>;
    /**
     * 同步生成JWT令牌
     * @param id - 用户ID
     * @returns 返回生成的JWT令牌
     */
    protected signSync(id?: string): string;
}
