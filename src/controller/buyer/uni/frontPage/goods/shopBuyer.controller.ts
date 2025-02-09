import { All, Controller, Inject, Query } from '@midwayjs/decorator';

import { ShopBuyerService } from '../../../../../module/trade/shopBuyer.service';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';

/**
 * 买家前端页面店铺买家控制器
 */
@Controller('/buyer/uni/frontPage/goods/shopBuyer')
export class BuyerUniFrontPageGoodsShopBuyerController {
  /**
   * 注入上下文对象
   */
  @Inject()
  private ctx: Context = null;

  /**
   * 注入店铺买家服务
   */
  @Inject()
  private shopBuyerService: ShopBuyerService = null;

  /**
   * 根据店铺买家ID获取店铺买家信息
   * 
   * @param id - 店铺买家ID
   * @returns 返回店铺买家信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('shopBuyerId') id = ''): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    // 记录日志
    console?.log?.(shopBuyerId);

    // 调用店铺买家服务的根据ID获取方法
    return await this?.shopBuyerService?.getById?.(id);
  }

  /**
   * 根据店铺买家编码获取店铺买家信息
   * 
   * @param code - 店铺买家编码
   * @returns 返回店铺买家信息
   */
  @All('/getByCode.json')
  public async getByCode(@Query('shopBuyerCode') code = ''): Promise<any> {
    // 调用店铺买家服务的根据编码获取方法
    return await this?.shopBuyerService?.getByCode(code);
  }
}
