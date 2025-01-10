import { All, Controller, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

import { ShopBuyerService } from '../../../../../../module/trade/shopBuyer.service';
import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa'; 

/**
 * 买家用户中心交易订单分销用户控制器
 */
@Controller('/buyer/uni/userCenter/trade/distribution/user', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterTradeOrderDistributionUserController {
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
   * 注入店铺买家服务
   */
  @Inject()
  private shopBuyerService: ShopBuyerService = null;
  /**
   * 获取当前用户的父关联用户
   * 
   * @returns 返回父关联用户信息
   */
  @All('/getParent.json', )
  public async getParent(): Promise<any> {
    // 记录日志
    this?.logger?.info?.('取得当前用户的父关联用户');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用店铺买家服务的获取父关联用户方法
    return await this?.shopBuyerService?.getParent?.(shopBuyerId);
  }
  /**
   * 获取当前用户的子一级关联用户
   * 
   * @returns 返回子一级关联用户信息
   */
  @All('/getChildren.json', )
  public async getChildren(): Promise<any> {
    // 记录日志
    this?.logger?.info?.('取得当前用户的子一级关联用户');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用店铺买家服务的获取子一级关联用户方法
    return await this?.shopBuyerService?.getChildren(shopBuyerId);
  }
}
