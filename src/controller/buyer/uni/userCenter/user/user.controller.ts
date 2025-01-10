import { All, Controller, Query, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

import { ShopBuyerService } from '../../../../../module/trade/shopBuyer.service';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';

/**
 * 买家用户中心用户控制器
 */
@Controller('/buyer/uni/userCenter/user', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterUserController {
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
   * 获取用户二维码
   * 
   * @param shopId - 店铺ID
   * @returns 返回二维码信息
   */
  @All('/qrcode.json', )
  public async qrcode(@Query('shopId') shopId): Promise<any> {
    // 记录日志
    this?.logger?.info?.('获取用户二维码controller');

    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    // 调用店铺买家服务的获取二维码方法
    return await this?.shopBuyerService.getQrcode(shopId, shopBuyerId);
  }

  /**
   * 根据Token获取用户信息
   * 
   * @returns 返回用户信息
   */
  @All('/getByToken.json', )
  public async getByToken(): Promise<any> {
    // 记录日志
    this?.logger?.info?.('根据Token获取用户信息controller');

    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    // 调用店铺买家服务的根据ID获取方法
    return await this?.shopBuyerService.getById(shopBuyerId);
  }

  /**
   * 根据ID获取用户信息
   * 
   * @param id - 用户ID
   * @returns 返回用户信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id): Promise<any> {
    // 记录日志
    this?.logger?.info?.('根据ID获取用户信息controller');

    // 调用店铺买家服务的根据ID获取方法
    return await this?.shopBuyerService.getById(id);
  }

  /**
   * 更新用户场景
   * 
   * @param scene - 场景信息
   * @returns 返回更新结果
   */
  @All('/updateScene.json', )
  public async updateScene(@Query('scene') scene): Promise<any> {
    // 记录日志
    this?.logger?.info?.('更新用户场景controller');

    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    // 检查用户ID是否为空
    if (!shopBuyerId) {
      return 'tokenIsEmpty';
    }

    // 调用店铺买家服务的更新场景方法
    return await this?.shopBuyerService.updateScene(scene, shopBuyerId);
  }

  /**
   * 根据用户名查找用户
   * 
   * @param username - 用户名
   * @param shopId - 店铺ID
   * @returns 返回用户信息
   */
  @All('/findByUsername.json', )
  public async findByUsername(@Query('username') username, @Query('shopId') shopId): Promise<any> {
    // 记录日志
    this?.logger?.info?.('根据用户名查找用户controller');

    // 调用店铺买家服务的根据用户名查找方法
    return await this?.shopBuyerService.findByUsername(username, shopId);
  }

}
