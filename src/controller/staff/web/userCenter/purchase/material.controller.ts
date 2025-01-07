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
import { MaterialService } from '../../../../../module/purchase/material.service';
import { Material } from '../../../../../entity/Material';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心采购物料控制器
 */
@Controller('/staff/web/userCenter/purchase/material')
export class StaffWebUserCenterPurchaseMaterialController {
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
   * 注入物料服务
   */
  @Inject()
  private materialService: MaterialService = null;
  /**
   * 获取物料分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
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
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console.log(staffId);
    // 调用物料服务的分页方法
    const data = await this?.materialService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取物料信息
   * 
   * @param id - 物料ID
   * @returns 返回物料信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用物料服务的根据ID获取方法
    return await this?.materialService?.getById?.(id, );
  }
  /**
   * 删除物料
   * 
   * @param ids - 物料ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用物料服务的删除方法
    await this?.materialService?.del?.(ids);
    // 返回空值
    return null;
  }
  /**
   * 更新物料信息
   * 
   * @param obj - 物料对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: Material): Promise<any> {
    // 调用物料服务的更新方法
    return await this?.materialService?.update?.(obj);
  }
  /**
   * 上架物料
   * 
   * @param id - 物料ID
   * @returns 返回上架结果
   */
  @All('/onsale.json')
  public async onsale(@Query('id') id: string): Promise<any> {
    // 调用物料服务的上架方法
    await this?.materialService?.onsale(id);
    // 返回空值
    return null;
  }
  /**
   * 下架物料
   * 
   * @param id - 物料ID
   * @returns 返回下架结果
   */
  @All('/instock.json')
  public async instock(@Query('id') id: string): Promise<any> {
    // 调用物料服务的下架方法
    await this?.materialService?.instock(id);
    // 返回空值
    return null;
  }
}
