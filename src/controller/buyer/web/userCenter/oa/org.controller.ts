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
import { OrgService } from '../../../../../module/oa/org.service';
import { Org } from '../../../../../entity/Org';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 买家Web用户中心OA组织控制器
 * 处理与组织相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/buyer/web/userCenter/oa/org', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerWebUserCenterDeptOrgController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入OrgService实例
  @Inject()
  private orgService: OrgService = null;
  
  /**
   * 分页查询组织
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    
    console.log(shopBuyerId);
    
    // 调用orgService的page方法进行分页查询
    const data = await this?.orgService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询组织
   * @param id - 组织ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用orgService的getById方法根据ID查询组织
    let data: any = await this?.orgService?.getById?.(id);
    
    // 如果查询结果为空，则返回一个空对象
    if (!data) {
      data = {};
    }
    return data;
  }
  
  /**
   * 删除组织
   * @param ids - 组织ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用orgService的del方法删除组织
    await this?.orgService?.del?.(ids);
    return null;
  }
  
  /**
   * 更新组织
   * @param obj - 组织对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Org): Promise<any> {
    // 调用orgService的update方法更新组织
    return await this?.orgService?.update?.(obj);
  }
}
