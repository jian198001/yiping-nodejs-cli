import { All, Body, Controller, Inject, Param } from '@midwayjs/decorator';

import { TradeOrderService } from '../../../../module/trade/tradeOrder.service';
import { BuyerService } from '../../../../module/trade/buyer.service';

/**
 * 员工Web前端页面微信支付控制器
 * 处理与微信支付相关的HTTP请求，如支付通知和批量转账
 */
@Controller('/staff/web/frontPage/wxpay')
export class StaffWebFrontPageWxpayController {
  // 注入TradeOrderService实例
  @Inject()
  private tradeOrderService: TradeOrderService = null;
  
  // 注入BuyerService实例
  @Inject()
  private buyerService: BuyerService = null;
  
  /**
   * 处理微信支付通知的请求
   * @param data - 包含支付通知数据的对象
   * @param shopId - 店铺ID
   * @returns 返回支付通知处理结果
   */
  @All('/paymentNotice/:shopId')
  public async paymentNotice(
    @Body() data: any,
    @Param('shopId') shopId: string
  ): Promise<string> {
    // shopId = 'YIgOhFMdQssHi6Ol6C8sbFVrIfSZHP5D'
  
    // 调用tradeOrderService的paymentNotice方法处理支付通知
    return await this?.tradeOrderService.paymentNotice(data, shopId);
  }
  
  /**
   * 处理批量转账的请求
   * @returns 返回批量转账处理结果
   */
  @All('/batchesTransfer.json')
  public async batchesTransfer(): Promise<string> {
    const shopId = 'YIgOhFMdQssHi6Ol6C8sbFVrIfSZHP5D';
  
    // 调用buyerService的batchesTransfer方法进行批量转账
    return await this?.buyerService.batchesTransfer(shopId, null);
  }
}
