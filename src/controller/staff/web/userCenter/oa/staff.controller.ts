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
import { StaffService } from '../../../../../module/oa/staff.service';
import { Staff } from '../../../../../entity/Staff';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心OA员工控制器
 * 处理与员工相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/oa/staff', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterDeptStaffController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入StaffService实例
  @Inject()
  private staffService: StaffService = null;
  
  /**
   * 分页查询员工
   * @param deptId - 部门ID
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('deptId') deptId = '',
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
    
    // 调用staffService的page方法进行分页查询
    const data = await this?.staffService?.page?.(
      deptId,
      query, params, reqParam,
      page
    );
    return data;
  }
  
  /**
   * 分页查询未分配员工
   * @param deptId - 部门ID
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/unallocatedPage.json')
  public async unallocatedPage(
    @Query('deptId') deptId: string,
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 调用staffService的page方法进行分页查询
    return await this?.staffService?.page?.(
      deptId,
      query, params, reqParam,
      page
    );
  }
  
  /**
   * 根据ID查询员工
   * @param id - 员工ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用staffService的getById方法根据ID查询员工
    let data: any = await this?.staffService?.getById?.(id);
    
    // 如果查询结果为空，则返回一个空对象
    if (!data) {
      data = {};
    }
    
    // 初始化角色和授权角色数组
    data.roles = [];
    data.authRole = [];
    return data;
  }
  
  /**
   * 删除员工
   * @param ids - 员工ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用staffService的del方法删除员工
    await this?.staffService?.del?.(ids);
  }
  
  /**
   * 更新员工
   * @param obj - 员工对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Staff): Promise<any> {
    // 调用staffService的update方法更新员工
    return await this?.staffService?.update?.(obj);
  }
}
