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
import { BrandService } from '../../../../../../module/trade/brand.service';
import { Brand } from '../../../../../../entity/Brand';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心商品品牌控制器
 */
@Controller('/staff/web/userCenter/goods/brand')
export class StaffWebUserCenterGoodsBrandController {
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
   * 注入品牌服务
   */
  @Inject()
  private brandService: BrandService = null;
  /**
   * 获取品牌分页列表
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
    // 调用品牌服务的分页方法
    const data = await this?.brandService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取品牌信息
   * 
   * @param id - 品牌ID
   * @returns 返回品牌信息
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用品牌服务的根据ID获取方法
    return await this?.brandService?.getById?.(id);
  }
  /**
   * 删除品牌
   * 
   * @param ids - 品牌ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用品牌服务的删除方法
    await this?.brandService?.del?.(ids);
  }
  /**
   * 更新品牌信息
   * 
   * @param obj - 品牌对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: Brand): Promise<any> {
    // 调用品牌服务的更新方法
    return await this?.brandService?.update?.(obj);
  }
}
