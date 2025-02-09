import { All, Controller, Inject, Query, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { SignInService } from '../../../../../module/signIn/signIn.service';
import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';

import { SignIn } from '../../../../../entity/SignIn';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';

/**
 * 买家用户中心签到控制器
 */
@Controller('/buyer/uni/userCenter/signIn/signIn', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterSignInSignInController {
  /**
   * 注入上下文对象
   */
  @Inject()
  private ctx: Context = null;
  
  /**
   * 注入日志记录器
   */
  @Logger()
  private logger: ILogger = null;
  
  /**
   * 注入签到服务
   */
  @Inject()
  private signInService: SignInService = null;
  
  /**
   * 获取签到分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    
    // 打印当前用户的ID
    console?.log?.(shopBuyerId);
    
    // 调用签到服务的分页方法
    const data = await this?.signInService?.page?.(query, params, reqParam, page);
    
    // 返回分页结果
    return data;
  }
  
  /**
   * 根据ID获取签到信息
   * 
   * @param id - 签到ID
   * @returns 返回签到信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用签到服务的根据ID获取方法
    return await this?.signInService?.getById?.(id);
  }
  
  /**
   * 执行签到操作
   * 
   * @param obj - 签到对象
   * @returns 返回签到结果
   */
  @All('/signIn.json', )
  public async signIn(@Query() obj: SignIn): Promise<any> {
    // 调用签到服务的签到方法
    return await this?.signInService?.signIn(obj);
  }
}
