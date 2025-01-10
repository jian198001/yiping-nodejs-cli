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

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';
import { Context } from '@midwayjs/koa';

/**
 * 买家Web用户中心交易订单控制器
 * 处理与交易订单相关的HTTP请求，如创建订单、分页查询、根据ID查询、更新、审核退款和获取图表数据
 */
@Controller('/buyer/web/userCenter/trade/tradeOrder', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerWebUserCenterTradeOrderTradeOrderController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入TradeOrderService实例
  @Inject()
  private tradeOrderService: TradeOrderService = null;
  
  /**
   * 创建订单
   * @param shopId - 店铺ID
   * @returns 返回创建订单的结果
   */
  @All('/createOrder.json', )
  public async createOrder(@Query('shopId') shopId): Promise<any> {
    // 根据购物车信息生成订单
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    
    // 调用tradeOrderService的createOrder方法创建订单
    return await this?.tradeOrderService.createOrder(shopBuyerId, shopId);
  }
  
  /**
   * 分页查询交易订单
   * @param tradeState - 交易状态
   * @param shopId - 店铺ID
   * @param shopBuyerId - 买家ID
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('tradeState') tradeState = '',
    @Query('shopId') shopId,
    @Query('shopBuyerId') shopBuyerId = '',
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // // 调用tradeOrderService的Transfer方法进行转账操作
    //  await this.tradeOrderService.transfer(shopId);
    
    // 调用tradeOrderService的page方法进行分页查询
    const data = await this?.tradeOrderService?.page?.(
      tradeState,
      shopId,
      shopBuyerId,
      query,
      params,
      reqParam,
      page,
    );
    return data;
  }
  
  /**
   * 根据ID查询交易订单
   * @param id - 订单ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用tradeOrderService的getById方法根据ID查询交易订单
    return await this?.tradeOrderService?.getById?.(id);
  }
  
  /**
   * 更新交易订单
   * @param obj - 交易订单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: TradeOrder): Promise<any> {
    // 调用tradeOrderService的update方法更新交易订单
    return await this?.tradeOrderService?.update?.(obj);
  }
  
  /**
   * 审核退款
   * @param orderId - 订单ID
   * @returns 返回审核退款的结果
   */
  @All('/auditRefund.json')
  public async auditRefund(@Query('id') orderId: string): Promise<any> {
    // 调用tradeOrderService的auditRefund方法审核退款
    return await this?.tradeOrderService?.auditRefund(orderId);
  }
  
  /**
   * 获取交易订单图表数据
   * @returns 返回图表数据
   */
  @All('/chart.json')
  public async chart(): Promise<any> {
    // 调用tradeOrderService的chart方法获取图表数据
    return await this?.tradeOrderService?.chart();
  }
}
