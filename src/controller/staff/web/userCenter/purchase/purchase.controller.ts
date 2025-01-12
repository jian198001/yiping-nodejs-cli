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
import { PurchaseOrderService } from '../../../../../module/purchase/purchaseOrder.service';
import { PurchaseOrder } from '../../../../../entity/PurchaseOrder';
import { Material } from '../../../../../entity/Material';
import { PurchaseOrderItem } from '../../../../../entity/PurchaseOrderItem';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心采购订单控制器
 */
@Controller('/staff/web/userCenter/purchaseOrder/purchaseOrder', { middleware: [JwtPassportMiddleware,], }, )
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
   * 注入采购订单服务
   */
  @Inject()
  private purchaseOrderService: PurchaseOrderService = null;
  /**
   * 获取采购订单分页列表
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
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('采购单分页列表controller');
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 调用采购订单服务的分页方法
    const data = await this?.purchaseOrderService?.page?.(
      staffId,
      '',
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取采购订单信息
   * 
   * @param id - 采购订单ID
   * @returns 返回采购订单信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用采购订单服务的根据ID获取方法
    return await this?.purchaseOrderService?.getById?.(id);
  }
  /**
   * 更新采购订单信息
   * 
   * @param obj - 采购订单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: PurchaseOrder): Promise<any> {
    // 设置采购订单的交易状态为编辑
    obj.tradeState = 'edit';
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 设置采购订单的创建用户ID
    obj.createUserId = staffId;
    // 调用采购订单服务的更新方法
    return await this?.purchaseOrderService?.update?.(obj);
  }
  /**
   * 提交采购订单
   * 
   * @param id - 采购订单ID
   * @returns 返回提交结果
   */
  @All('/submit.json')
  public async submit(@Query('id') id): Promise<any> {
    // 调用采购订单服务的提交方法
    return await this?.purchaseOrderService?.submit(id);
  }
  /**
   * 更新采购订单项信息
   * 
   * @param obj - 物料对象
   * @param purchaseOrderItem - 采购订单项对象
   * @param type - 更新类型
   * @returns 返回更新结果
   */
  @All('/updateItem.json')
  public async updateItem(
    @Body() obj: Material,
    @Body() purchaseOrderItem: PurchaseOrderItem,
    @Body('type') type: string
  ): Promise<any> {
    // 调用采购订单服务的更新订单项方法
    return await this?.purchaseOrderService?.updateItem(
      obj,
      purchaseOrderItem,
      type
    );
  }
  /**
   * 删除采购订单
   * 
   * @param ids - 采购订单ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用采购订单服务的删除方法
    await this?.purchaseOrderService?.del?.(ids);
    // 返回空值
     return {} ;
  }
}
