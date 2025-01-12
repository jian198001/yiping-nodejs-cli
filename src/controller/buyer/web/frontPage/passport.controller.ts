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

/**
 * 买家Web前端页面认证控制器
 * 处理与买家认证相关的HTTP请求，如登录、注册、登出、验证码生成和验证等
 */
@Controller('/buyer/web/frontPage/passport')
export class BuyerUniFrontPagePassportPassportController {
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入BuyerService实例
  @Inject()
  private buyerService: BuyerService = null;
  
  // 注入JwtService实例
  @Inject()
  private jwtService: JwtService = null;
  
  // 注入CaptchaService实例
  @Inject()
  private captchaService: CaptchaService = null;
  
  /**
   * 买家登录
   * @param buyer - 买家对象
   * @param shopId - 店铺ID
   * @returns 返回登录结果，包括访问令牌、刷新令牌等
   */
  @All('/login.json')
  public async login(
    @Body() buyer: Buyer,
    @Body('shopId') shopId = ''
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('登录controller');
  
    let token: string = null,
      data: any = null;
  
    // 调用buyerService的login方法进行登录验证
    data = await this?.buyerService?.login(buyer, shopId);
  
    // 生成JWT令牌
    token = this?.signSync(data.id);
  
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  
  /**
   * 微信小程序买家登录
   * @param code - 微信小程序登录凭证
   * @param shopId - 店铺ID
   * @returns 返回登录结果，包括访问令牌、刷新令牌等
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
  
    // 调用buyerService的loginWxma方法进行微信小程序登录验证
    data = await this?.buyerService?.loginWxma(code, shopId);
  
    // 生成JWT令牌
    token = this?.signSync(data.id);
  
    return {
      accessToken: token,
      refreshToken: token,
      expiresTime: 999999,
      token: token,
    };
  }
  
  /**
   * 买家注册
   * @param buyer - 买家对象
   * @param shopId - 店铺ID
   * @returns 返回注册结果
   */
  @All('/regjson')
  public async reg(
    @Body() buyer: Buyer,
    @Body('shopId') shopId = ''
  ): Promise<any> {
    // 调用buyerService的reg方法进行注册
    return await this?.buyerService?.reg(shopId, buyer);
  }
  
  /**
   * 买家登出
   * @param accessToken - 访问令牌
   * @returns 返回登出结果
   */
  @All('/logout.json')
  public async logout(@Query('accessToken') accessToken: string): Promise<any> {
     return {} ;
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
  
  /**
   * 同步生成JWT令牌
   * @param id - 用户ID
   * @returns 返回生成的JWT令牌
   */
  protected signSync(id = ''): string {
    if (!id) {
      return '';
    }
  
    const payload: any = { id: id };
  
    // 调用jwtService的signSync方法生成JWT令牌
    return this?.jwtService?.signSync(payload, 'yiping', {
      expiresIn: '999999d',
    });
  }
}
