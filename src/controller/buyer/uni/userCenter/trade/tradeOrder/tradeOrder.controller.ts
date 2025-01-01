import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { TradeOrderService } from '../../../../../../module/trade/tradeOrder.service';
import { TradeOrder } from '../../../../../../entity/TradeOrder';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 买家用户中心交易订单控制器
 */
@Controller('/buyer/uni/userCenter/trade/tradeOrder')
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
   * 创建订单
   * 
   * @param shopId - 店铺ID
   * @returns 返回创建订单的结果
   */
  @All('/createOrder.json', { middleware: [JwtPassportMiddleware] })
  public async createOrder(@Query('shopId') shopId): Promise<any> {
    // 根据购物车信息生成订单
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    return await this?.tradeOrderService.createOrder(
      shopBuyerId,
      shopId
    );
  }

  /**
   * 获取交易订单分页列表
   * 
   * @param tradeState - 交易状态
   * @param shopId - 店铺ID
   * @param shopBuyerId - 买家ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query('tradeState') tradeState = '',
    @Query('shopId') shopId,
    @Query('shopBuyerId') shopBuyerId = '',
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 分页列表controller
    this?.logger?.info?.('分页列表controller');

    const data = await this?.tradeOrderService?.page?.(
      tradeState,
      shopId,
      shopBuyerId,
      query,
      params,
      reqParam,
      page
    );

    return data;
  }

  /**
   * 根据ID获取交易订单
   * 
   * @param id - 交易订单ID
   * @returns 返回交易订单信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    return await this?.tradeOrderService?.getById?.(id);
  }

  /**
   * 更新交易订单
   * 
   * @param obj - 交易订单对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: TradeOrder): Promise<any> {
    return await this?.tradeOrderService?.update?.(obj);
  }

  /**
   * 审核退款
   * 
   * @param orderId - 订单ID
   * @returns 返回审核退款的结果
   */
  @All('/auditRefund.json')
  public async auditRefund(@Query('id') orderId: string): Promise<any> {
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    return await this?.tradeOrderService?.auditRefund(shopBuyerId, orderId);
  }

  /**
   * 取消退款
   * 
   * @param orderId - 订单ID
   * @returns 返回取消退款的结果
   */
  @All('/cancelRefund.json')
  public async cancelRefund(@Query('id') orderId: string): Promise<any> {
    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    return await this?.tradeOrderService?.cancelRefund(shopBuyerId, orderId);
  }

  /**
   * 商品详情-立即购买
   * 
   * @param totalAmount - 总金额
   * @param message - 留言
   * @returns 返回立即购买的结果
   */
  @All('/amountBuy.json')
  public async amountBuy(
    @Query('totalAmount') totalAmount = 0.0,
    @Query('message') message = ''
  ): Promise<any> {
    // 商品详情-立即购买
    this?.logger?.info?.('商品详情-立即购买');

    const shopBuyerId: string = this?.ctx?.state?.user?.id;

    return await this?.tradeOrderService?.amountBuy(
      totalAmount,
      message,
      shopBuyerId,
      null
    );
  }

  /**
   * 商品详情-立即购买
   * 
   * @param map - 参数映射
   * @returns 返回立即购买的结果
   */
  @All('/buy.json')
  public async buy(@Query() map: any): Promise<any> {
    // 商品详情-立即购买
    this?.logger?.info?.('商品详情-立即购买');

    const shopBuyerId: string = this?.ctx?.state?.user?.id;

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
   * @returns 返回更新订单地址的结果
   */
  @All('/updateAddress.json')
  public async updateAddress(
    @Query('id') id: string,
    @Query('addressId') addressId: string
  ): Promise<any> {
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
   * @returns 返回更新订单留言的结果
   */
  @All('/updateMessage.json')
  public async updateMessage(
    @Query('id') id: string,
    @Query('message') message: string
  ): Promise<any> {
    return await this?.tradeOrderService?.updateMessage(
      id,
      message
    );
  }

  /**
   * 微信支付统一下单
   * 
   * @param id - 订单ID
   * @returns 返回微信支付统一下单的结果
   */
  @All('/wxpayUnifiedOrder.json')
  public async wxpayUnifiedOrder(@Query('id') id: string): Promise<any> {
    return this?.tradeOrderService?.wxpayUnifiedOrder(id);
  }

  /**
   * 更新交易状态
   * 
   * @param id - 订单ID
   * @param tradeState - 交易状态
   * @returns 返回更新交易状态的结果
   */
  @All('/updateTradeState.json')
  public async updateTradeState(
    @Query('id') id: string,
    @Query('tradeState') tradeState: string
  ): Promise<any> {
    return await this?.tradeOrderService?.updateTradeState(id, tradeState);
  }

  /**
   * 更新发货状态
   * 
   * @param id - 订单ID
   * @param deliveryState - 发货状态
   * @returns 返回更新发货状态的结果
   */
  @All('/update
