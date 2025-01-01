import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { PurchaseOrderItemService } from '../../../../../module/purchase/purchaseOrderItem.service';
import { PurchaseOrderItem } from '../../../../../entity/PurchaseOrderItem';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心采购订单项控制器
 */
@Controller('/staff/web/userCenter/purchaseOrder/purchaseOrderItem')
export class StaffWebUserCenterPurchaseOrderPurchaseOrderController {
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
   * 注入采购订单项服务
   */
  @Inject()
  private purchaseOrderItemService: PurchaseOrderItemService = null;
  /**
   * 获取采购订单项分页列表
   * 
   * @param orderId - 订单ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query('orderId') orderId = '',
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console.log(staffId);
    // 调用采购订单项服务的分页方法
    const data = await this?.purchaseOrderItemService?.page?.(
      orderId,
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取采购订单项信息
   * 
   * @param id - 采购订单项ID
   * @returns 返回采购订单项信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用采购订单项服务的根据ID获取方法
    return await this?.purchaseOrderItemService?.getById?.(id);
  }
  /**
   * 更新采购订单项信息
   * 
   * @param obj - 采购订单项对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: PurchaseOrderItem): Promise<any> {
    // 调用采购订单项服务的更新方法
    return await this?.purchaseOrderItemService?.update?.(obj);
  }
}
