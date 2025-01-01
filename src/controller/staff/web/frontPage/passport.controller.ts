import { All, Inject, Query, Logger, Body } from '@midwayjs/decorator';
import { Controller } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { CaptchaService } from '@midwayjs/captcha';

import { ILogger } from '@midwayjs/logger';
import { Staff } from '../../../../entity/Staff';

import { LocalPassportMiddleware } from '../../../../middleware/local.passport.middleware';
import { Zero0Error } from '../../../../module/common/model/Zero0Error';
import { StaffService } from '../../../../module/oa/staff.service';

/**
 * 员工Web前端页面认证控制器
 * 处理与员工认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
@Controller('/staff/web/frontPage/passport')
export class StaffWebFrontPagePassportController {
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入CaptchaService实例
  @Inject()
  private captchaService: CaptchaService = null;
  
  // 注入StaffService实例
  @Inject()
  private staffService: StaffService = null;
  
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  /**
   * 处理登录错误的请求
   * @returns 返回一个Zero0Error对象，表示用户名或密码错误
   */
  @All('/loginError.json')
  public async loginError(): Promise<any> {
    // 创建一个Zero0Error对象，表示用户名或密码错误
    const zero0Error: Zero0Error = new Zero0Error('用户名或密码错误', '401');
    
    // 抛出错误
    throw zero0Error;
  }
  
  /**
   * 处理员工登录的请求
   * @param staff - 包含员工登录信息的Staff对象
   * @returns 返回一个包含访问令牌、刷新令牌、过期时间和令牌的对象
   */
  @All('/login.json', { middleware: [LocalPassportMiddleware] })
  public async login(@Body() staff: Staff): Promise<any> {
    // 记录日志
    this?.logger?.info?.('登录controller');
    
    // 从上下文中获取用户信息
    let token: any = this?.ctx.state.user;
    
    // 如果用户信息中包含令牌，则使用该令牌
    if (token?.token) {
      token = token?.token;
    }
    
    // 返回包含访问令牌、刷新令牌、过期时间和令牌的对象
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  
  /**
   * 处理员工注册的请求
   * @param staff - 包含员工注册信息的Staff对象
   * @returns 返回注册结果
   */
  @All('/regjson')
  public async reg(@Body() staff: Staff): Promise<any> {
    // 调用staffService的reg方法进行注册
    return await this?.staffService.reg(staff);
  }
  
  /**
   * 处理员工登出的请求
   * @returns 返回一个空对象
   */
  @All('/logout.json')
  public async logout(): Promise<any> {
    // 返回一个空对象
    return {};
  }
  
  /**
   * 生成验证码图片
   * @returns 返回验证码图片数据
   */
  @All('/captchaImage.json')
  public async captchaImage(): Promise<any> {
    // 调用captchaService的image方法生成验证码图片
    return await this?.captchaService?.image({
      width: 120,
      height: 40,
    });
  }
  
  /**
   * 生成验证码公式
   * @returns 返回验证码公式数据
   */
  @All('/captchaFormula.json')
  public async captchaFormula(): Promise<any> {
    // 调用captchaService的formula方法生成验证码公式
    return await this?.captchaService?.formula({ noise: 1 });
  }
  
  /**
   * 验证验证码
   * @param id - 验证码ID
   * @param answer - 验证码答案
   * @returns 返回验证结果
   */
  @All('/checkCaptcha.json')
  public async checkCaptcha(
    @Query('id') id: string,
    @Query('answer') answer: string
  ): Promise<any> {
    // 调用captchaService的check方法验证验证码
    return await this?.captchaService?.check(id, answer);
  }
}
