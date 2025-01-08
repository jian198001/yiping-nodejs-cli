import { Buyer } from "../../../../../entity/Buyer";
import { GoogleCredentials } from "../../../../../entity/GoogleCredentials";
/**
 * 买家前端页面通行证控制器
 */
export declare class BuyerUniFrontPagePassportPassportController {
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入买家服务
     */
    private buyerService;
    /**
     * 注入JWT服务
     */
    private jwtService;
    /**
     * 注入验证码服务
     */
    private captchaService;
    /**
     * 买家登录
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    buyerLogin(buyer: Buyer, shopId: any): Promise<any>;
    /**
     * 卖家登录
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    sellerLogin(buyer: Buyer, shopId: any): Promise<any>;
    /**
     * 微信小程序登录
     *
     * @param code - 微信小程序登录凭证
     * @param shopId - 店铺ID
     * @returns 返回登录结果
     */
    loginWxma(code: string, shopId: any): Promise<any>;
    /**
     * Google登录
     *
     * @param body - Google登录凭证
     * @returns 返回登录结果
     */
    loginGoogle(body: GoogleCredentials): Promise<any>;
    /**
     * 注册
     *
     * @param buyer - 买家信息
     * @param shopId - 店铺ID
     * @returns 返回注册结果
     */
    reg(buyer: Buyer, shopId?: string): Promise<any>;
    /**
     * 注销
     *
     * @param accessToken - 访问令牌
     * @returns 返回注销结果
     */
    logout(accessToken: string): Promise<any>;
    /**
     * 获取验证码图片
     *
     * @returns 返回验证码图片
     */
    captchaImage(): Promise<any>;
    /**
     * 获取验证码公式
     *
     * @returns 返回验证码公式
     */
    captchaFormula(): Promise<any>;
    /**
     * 验证验证码
     *
     * @param id - 验证码ID
     * @param answer - 验证码答案
     * @returns 返回验证结果
     */
    checkCaptcha(id: string, answer: string): Promise<any>;
    /**
     * 生成JWT token
     *
     * @param id - 用户ID
     * @returns 返回JWT token
     */
    protected signSync(id?: string): string;
}
