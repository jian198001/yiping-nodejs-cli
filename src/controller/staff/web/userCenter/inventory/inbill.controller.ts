import { All, Controller, Inject, Query, Logger,
  Body, } from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { PurchaseOrderService } from '../../../../../module/purchase/purchaseOrder.service';
import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';
import { InbillService } from '../../../../../module/inventory/inbill.service';

/**
 * 员工Web用户中心库存入库单控制器
 * 处理与库存入库单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/inventory/inbill')
export class StaffWebUserCenterInventoryInbillController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入PurchaseOrderService实例
  @Inject()
  private purchaseOrderService: PurchaseOrderService = null;
  
  // 注入InbillService实例
  @Inject()
  private inbillService: InbillService = null;
  
  /**
   * 分页查询库存入库单
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', { middleware: [JwtPassportMiddleware] })
  public async page(
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    console.log(staffId);
    
    // 获取当前用户角色ID
    const roleId = staffId;
    
    // 调用purchaseOrderService的page方法进行分页查询
    const data = await this?.purchaseOrderService?.page?.(roleId,
      'DELIVERY',
      query, params, reqParam,
      page
    );
    return data;
  }
  
  /**
   * 根据ID查询库存入库单
   * @param id - 库存入库单ID
   * @returns 返回查询结果
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用purchaseOrderService的getById方法根据ID查询库存入库单
    return await this?.purchaseOrderService?.getById?.(id);
  }
  
  /**
   * 删除库存入库单
   * @param ids - 库存入库单ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用purchaseOrderService的del方法删除库存入库单
    await this?.purchaseOrderService?.del?.(ids);
  }
  
  /**
   * 采购入库
   * @param data - 采购入库数据
   * @returns 返回采购入库结果
   */
  @All('/purchaseInstock.json')
  public async purchaseInstock(@Body() data: any, ): Promise<any> {
    // 调用purchaseOrderService的purchaseInstock方法进行采购入库
    await this?.purchaseOrderService?.purchaseInstock?.(data, );
  }
  
  /**
   * 消费入库
   * @param data - 消费入库数据
   * @returns 返回消费入库结果
   */
  @All('/consumeInstock.json')
  public async consumeInstock(@Body() data: any): Promise<any> {
    // 构造入库单列表
    const list: any[] = [{
      id: data?.id,
      instockQuantity: data?.instockQuantity,
      materialId: data?.materialId,
      billId: data?.id,
    }];
    // 调用inbillService的consumeInbill方法进行消费入库
    await this?.inbillService?.consumeInbill?.(data, list);
  }
}
