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
import { TabbarService } from '../../../../../module/mobile/tabbar.service';
import { Tabbar } from '../../../../../entity/Tabbar';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心移动底部导航栏控制器
 * 处理与移动底部导航栏相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/mobile/tabbar', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterMobileTabbarController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入TabbarService实例
  @Inject()
  private tabbarService: TabbarService = null;
  
  /**
   * 分页查询移动底部导航栏
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
    
    console?.log?.(staffId);
    
    // 调用tabbarService的page方法进行分页查询
    const data = await this?.tabbarService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询移动底部导航栏
   * @param id - 移动底部导航栏ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用tabbarService的getById方法根据ID查询移动底部导航栏
    return await this?.tabbarService?.getById?.(id);
  }
  
  /**
   * 删除移动底部导航栏
   * @param ids - 移动底部导航栏ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用tabbarService的del方法删除移动底部导航栏
    await this?.tabbarService?.del?.(ids);
  }
  
  /**
   * 更新移动底部导航栏
   * @param obj - 移动底部导航栏对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Tabbar): Promise<any> {
    // 调用tabbarService的update方法更新移动底部导航栏
    return await this?.tabbarService?.update?.(obj);
  }
}
