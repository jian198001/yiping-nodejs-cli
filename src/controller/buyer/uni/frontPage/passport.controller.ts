import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ILogger } from '@midwayjs/logger';
import { BuyerService } from '../../../../module/trade/buyer.service';
import { Buyer } from '../../../../entity/Buyer';

import { CaptchaService } from '@midwayjs/captcha';
import { JwtService } from '@midwayjs/jwt';
import { GoogleCredentials } from '../../../../entity/GoogleCredentials';

/**
 * 买家前端页面通行证控制器
 */
@Controller('/buyer/uni/frontPage/passport')
export class BuyerUniFrontPagePassportPassportController {
  /**
   * 注入日志记录器
   */
  @Logger()
  private logger: ILogger = null;
  /**
   * 注入买家服务
   */
  @Inject()
  private buyerService: BuyerService = null;
  /**
   * 注入JWT服务
   */
  @Inject()
  private jwtService: JwtService = null;
  /**
   * 注入验证码服务
   */
  @Inject()
  private captchaService: CaptchaService = null;
  /**
   * 买家登录
   * 
   * @param buyer - 买家信息
   * @param shopId - 店铺ID
   * @returns 返回登录结果
   */
  @All('/login.json')
  public async login(@Query() buyer: Buyer, shopId = ''): Promise<any> {
    // 记录日志
    this?.logger?.info?.('登录controller');
    let token: string = null,
      data: any = null;
    // 调用买家服务的登录方法
    data = await this?.buyerService?.login(buyer, shopId);
    // 生成JWT token
    token = this?.signSync(data.id);
    // 返回登录结果
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  /**
   * 微信小程序登录
   * 
   * @param code - 微信小程序登录凭证
   * @param shopId - 店铺ID
   * @returns 返回登录结果
   */
  @All('/loginWxma.json')
  public async loginWxma(
    @Query('code') code = 'the code is a mock one',
    @Query('shopId') shopId, 
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('登录controller');
    let token: string = null,
      data: any = null;
    // 调用买家服务的微信小程序登录方法
    data = await this?.buyerService?.loginWxma(code, shopId);
    // 生成JWT token
    token = this?.signSync(data.id);
    // 返回登录结果
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  /**
   * Google登录
   * 
   * @param body - Google登录凭证
   * @returns 返回登录结果
   */
  @All('/loginGoogle.json')
  public async loginGoogle(
  @Body() body: GoogleCredentials,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('登录controller');
    let token: string = null,
      data: any = await this?.buyerService?.loginGoogle(body);
    // 生成JWT token
    token = this?.signSync(data?.id);
    // 返回登录结果
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  /**
   * 注册
   * 
   * @param buyer - 买家信息
   * @param shopId - 店铺ID
   * @returns 返回注册结果
   */
  @All('/reg.json')
  public async reg(
    @Body() buyer: Buyer,
    @Body('shopId') shopId = ''
  ): Promise<any> {
    // 调用买家服务的注册方法
    return await this?.buyerService?.reg(shopId, buyer);
  }
  /**
   * 注销
   * 
   * @param accessToken - 访问令牌
   * @returns 返回注销结果
   */
  @All('/logout.json')
  public async logout(@Query('accessToken') accessToken: string): Promise<any> {
    // 返回注销结果
    return null;
  }
  /**
   * 获取验证码图片
   * 
   * @returns 返回验证码图片
   */
  @All('/captchaImage.json')
  public async captchaImage(): Promise<any> {
    // 调用验证码服务的生成图片方法
    return await this?.captchaService?.image({
      width: 120,
      height: 40,
    });
  }
  /**
   * 获取验证码公式
   * 
   * @returns 返回验证码公式
   */
  @All('/captchaFormula.json')
  public async captchaFormula(): Promise<any> {
    // 调用验证码服务的生成公式方法
    return await this?.captchaService?.formula({ noise: 1 });
  }
  /**
   * 验证验证码
   * 
   * @param id - 验证码ID
   * @param answer - 验证码答案
   * @returns 返回验证结果
   */
  @All('/checkCaptcha.json')
  public async checkCaptcha(
    @Query('id') id: string,
    @Query('answer') answer: string
  ): Promise<any> {
    // 调用验证码服务的验证方法
    return await this?.captchaService?.check(id, answer);
  }
  /**
   * 生成JWT token
   * 
   * @param id - 用户ID
   * @returns 返回JWT token
   */
  protected signSync(id = ''): string {
    if (!id) {
      return '';
    }

    const payload: any = { id: id };

    // 调用JWT服务的签名方法
    return this?.jwtService?.signSync(payload, 'yiping', {
      expiresIn: '999999d',
    });
  }
}
