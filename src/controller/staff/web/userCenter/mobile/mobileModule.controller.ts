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
import { MobileModuleService } from '../../../../../module/mobile/mobileModule.service';
import { MobileModule } from '../../../../../entity/MobileModule';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心移动模块控制器
 * 处理与移动模块相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/mobile/mobileModule')
export class StaffWebUserCenterMobileMobileModuleController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入MobileModuleService实例
  @Inject()
  private mobileModuleService: MobileModuleService = null;
  
  /**
   * 分页查询移动模块
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
    
    // 调用mobileModuleService的page方法进行分页查询
    const data = await this?.mobileModuleService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询移动模块
   * @param id - 移动模块ID
   * @returns 返回查询结果
   */
  @All('/getById.json', { middleware: [JwtPassportMiddleware] })
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用mobileModuleService的getById方法根据ID查询移动模块
    return await this?.mobileModuleService?.getById?.(id);
  }
  
  /**
   * 删除移动模块
   * @param ids - 移动模块ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', { middleware: [JwtPassportMiddleware] })
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用mobileModuleService的del方法删除移动模块
    await this?.mobileModuleService?.del?.(ids);
  }
  
  /**
   * 更新移动模块
   * @param obj - 移动模块对象
   * @returns 返回更新结果
   */
  @All('/update.json', { middleware: [JwtPassportMiddleware] })
  public async update(@Body() obj: MobileModule): Promise<any> {
    // 调用mobileModuleService的update方法更新移动模块
    return await this?.mobileModuleService?.update?.(obj);
  }
}
