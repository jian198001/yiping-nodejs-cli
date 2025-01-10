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
import { OutbillService } from '../../../../../module/inventory/outbill.service';
import { Outbill } from '../../../../../entity/Outbill';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心库存出库单控制器
 * 处理与库存出库单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/inventory/outbill', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterInventoryOutbillController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入OutbillService实例
  @Inject()
  private outbillService: OutbillService = null;
  
  /**
   * 分页查询库存出库单
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
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
    
    // 调用outbillService的page方法进行分页查询
    const data = await this?.outbillService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询库存出库单
   * @param id - 库存出库单ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用outbillService的getById方法根据ID查询库存出库单
    return await this?.outbillService?.getById?.(id);
  }
  
  /**
   * 删除库存出库单
   * @param ids - 库存出库单ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用outbillService的del方法删除库存出库单
    await this?.outbillService?.del?.(ids);
  }
  
  /**
   * 更新库存出库单
   * @param obj - 库存出库单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Outbill): Promise<any> {
    // 调用outbillService的update方法更新库存出库单
    return await this?.outbillService?.update?.(obj);
  }
  
  /**
   * 消费出库
   * @param data - 消费出库数据
   * @returns 返回消费出库结果
   */
  @All('/consumeOutstock.json', )
  public async consumeOutstock(@Body() data: any): Promise<any> {
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    // 构造出库单列表
    const list: any[] = [{
      id: data?.id,
      consumeQuantity: data?.consumeQuantity,
      materialId: data?.materialId,
      billId: data?.id,
      staffId: staffId,
    }];
    console.log('staffId: ', staffId);
    // 调用outbillService的consume方法进行消费出库
    await this?.outbillService?.consume(data, list, staffId);
  }
}
