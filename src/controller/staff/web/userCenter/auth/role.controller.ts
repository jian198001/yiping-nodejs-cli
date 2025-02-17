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
import { RoleService } from '../../../../../module/auth/role.service';
import { Role } from '../../../../../entity/Role';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware'; 

/**
 * 员工Web用户中心权限角色控制器
 * 负责处理与角色相关的HTTP请求，如分页查询、根据ID查询、删除、更新和更新数据范围
 */
@Controller('/staff/web/userCenter/auth/role', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterAuthRoleController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入RoleService实例
  @Inject()
  private roleService: RoleService = null;
  
  /**
   * 分页查询角色
   * @param userId - 用户ID
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('userId') userId: string,
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
    
    // 调用roleService的page方法进行分页查询
    const data = await this?.roleService?.page?.(
      userId,
      true,
      query, params, reqParam,
      page
    );
    return data;
  }
  
  /**
   * 根据ID查询角色
   * @param id - 角色ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用roleService的getById方法根据ID查询角色
    return await this?.roleService?.getById?.(id);
  }
  
  /**
   * 删除角色
   * @param ids - 角色ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用roleService的del方法删除角色
    await this?.roleService?.del?.(ids);
  }
  
  /**
   * 更新角色
   * @param obj - 角色对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Role): Promise<any> {
    // 调用roleService的update方法更新角色
    const data = await this?.roleService?.update?.(obj);
    return data;
  }
  
  /**
   * 更新角色数据范围
   * @param obj - 角色对象
   * @returns 返回更新结果
   */
  @All('/updateDataScope.json')
  public async updateDataScope(@Body() obj: Role): Promise<any> {
    // 调用roleService的updateDataScope方法更新角色数据范围
    const data: Role = await this?.roleService?.updateDataScope(obj);
    return data;
  }
}
