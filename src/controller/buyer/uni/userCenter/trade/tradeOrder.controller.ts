import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { TradeOrderService } from '../../../../../module/trade/tradeOrder.service';
import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';

import { TradeOrder } from '../../../../../entity/TradeOrder';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Context } from '@midwayjs/koa';
 
/**
 * 买家用户中心交易订单控制器
 */
@Controller('/buyer/uni/userCenter/trade/tradeOrder', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerUniUserCenterTradeOrderTradeOrderController {
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
   * 注入交易订单服务
   */
  @Inject()
  private tradeOrderService: TradeOrderService = null;
  /**
   * 获取交易订单分页列表
   * 
   * @param tradeState - 交易状态
   * @param shopId - 店铺ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('tradeState') tradeState = '',
    @Query('shopId') shopId,
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用交易订单服务的分页方法
    const data = await this?.tradeOrderService?.page?.(
      tradeState,
      shopId,
      shopBuyerId,
      query,
      params,
      reqParam,
      page,
    );
    // 返回分页结果
    return data;
  }
  /**
   * 统计不同交易状态的订单数量
   * 
   * @param shopId - 店铺ID
   * @returns 返回统计结果
   */
  @All('/countTradeState.json', )
  public async countTradeState(@Query('shopId') shopId, ): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用交易订单服务的统计方法
    return await this?.tradeOrderService?.countTradeState(
      shopId,
      shopBuyerId
    );
  }
  /**
   * 根据ID获取交易订单
   * 
   * @param id - 交易订单ID
   * @returns 返回交易订单信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用交易订单服务的根据ID获取方法
    return await this?.tradeOrderService?.getById?.(id);
  }
  /**
   * 更新交易订单
   * 
   * @param obj - 交易订单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Query() obj: TradeOrder): Promise<any> {
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 设置用户ID
    obj.shopBuyerId = shopBuyerId;
    // 调用交易订单服务的更新方法
    return await this?.tradeOrderService?.update?.(obj);
  }
  /**
   * 根据购物车信息创建订单
   * 
   * @param cartItems - 购物车项
   * @param shopId - 店铺ID
   * @returns 返回创建结果
   */
  @All('/createOrder.json', )
  public async createOrder(
    @Body() cartItems: string[] = [],
    @Query('shopId') shopId,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('根据购物车信息生成订单');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用交易订单服务的创建订单方法
    return await this?.tradeOrderService?.createOrder(
      shopBuyerId,
      shopId,
      cartItems
    );
  }
  /**
   * 立即购买
   * 
   * @param totalAmount - 总金额
   * @param message - 留言
   * @returns 返回购买结果
   */
  @All('/amountBuy.json', )
  public async amountBuy(
    @Query('totalAmount') totalAmount = 0.0,
    @Query('message') message = ''
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('商品详情-立即购买');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用交易订单服务的立即购买方法
    return await this?.tradeOrderService?.amountBuy(
      totalAmount,
      message,
      shopBuyerId,
      null
    );
  }
  /**
   * 立即购买
   * 
   * @param map - 参数映射
   * @returns 返回购买结果
   */
  @All('/buy.json', )
  public async buy(@Query() map: any): Promise<any> {
    // 记录日志
    this?.logger?.info?.('商品详情-立即购买');
    // 获取当前用户的ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    // 调用交易订单服务的立即购买方法
    return await this?.tradeOrderService?.buy(
      map,
      shopBuyerId,
      0.01
    );
  }
  /**
   * 更新订单地址
   * 
   * @param id - 订单ID
   * @param addressId - 地址ID
   * @returns 返回更新结果
   */
  @All('/updateAddress.json', )
  public async updateAddress(
    @Query('id') id: string,
    @Query('addressId') addressId: string
  ): Promise<any> {
    // 调用交易订单服务的更新地址方法
    return await this?.tradeOrderService?.updateAddress(
      id,
      addressId
    );
  }
  /**
   * 更新订单留言
   * 
   * @param id - 订单ID
   * @param message - 留言
   * @returns 返回更新结果
   */
  @All('/updateMessage.json', )
  public async updateMessage(
    @Query('id') id: string,
    @Query('message') message: string
  ): Promise<any> {
    // 调用交易订单服务的更新留言方法
    return await this?.tradeOrderService?.updateMessage(
      id,
      message
    );
  }
  /**
   * 微信支付统一下单
   * 
   * @param id - 订单ID
   * @returns 返回下单结果
   */
  @All('/wxpayUnifiedOrder.json', )
  public async wxpayUnifiedOrder(@Query('id') id: string): Promise<any> {
    // 调用交易订单服务的微信支付统一下单方法
    return this?.
    tradeOrderService?.wxpayUnifiedOrder(
      id
    );
  }
}
