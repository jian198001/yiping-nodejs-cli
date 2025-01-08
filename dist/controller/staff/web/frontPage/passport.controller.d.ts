import { Staff } from '../../../../entity/Staff';
/**
 * 员工Web前端页面认证控制器
 * 处理与员工认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
export declare class StaffWebFrontPagePassportController {
    private logger;
    private captchaService;
    private staffService;
    private ctx;
    /**
     * 处理登录错误的请求
     * @returns 返回一个Zero0Error对象，表示用户名或密码错误
     */
    loginError(): Promise<any>;
    /**
     * 处理员工登录的请求
     * @param staff - 包含员工登录信息的Staff对象
     * @returns 返回一个包含访问令牌、刷新令牌、过期时间和令牌的对象
     */
    login(staff: Staff): Promise<any>;
    /**
     * 处理员工注册的请求
     * @param staff - 包含员工注册信息的Staff对象
     * @returns 返回注册结果
     */
    reg(staff: Staff): Promise<any>;
    /**
     * 处理员工登出的请求
     * @returns 返回一个空对象
     */
    logout(): Promise<any>;
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
}
