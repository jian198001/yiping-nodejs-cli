import { All, Controller, Inject, Query } from '@midwayjs/decorator';

import { ShopService } from '../../../../../module/trade/shop.service';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 买家前端页面店铺控制器
 */
@Controller('/buyer/uni/frontPage/goods/shop')
export class BuyerUniFrontPageGoodsShopController {
  /**
   * 注入店铺服务
   */
  @Inject()
  private shopService: ShopService = null;

  /**
   * 根据店铺ID获取店铺信息
   * 
   * @param id - 店铺ID
   * @returns 返回店铺信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('shopId') id = ''): Promise<any> {
    // 调用店铺服务的根据ID获取方法
    return await this?.shopService?.getById?.(id);
  }

  /**
   * 根据店铺编码获取店铺信息
   * 
   * @param code - 店铺编码
   * @returns 返回店铺信息
   */
  @All('/getByCode.json')
  public async getByCode(@Query('shopCode') code = ''): Promise<any> {
    // 调用店铺服务的根据编码获取方法
    return await this?.shopService?.getByCode(code);
  }
}
