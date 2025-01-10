import { All, Body, Controller, Inject, Query } from '@midwayjs/decorator';

import { MenuService } from '../../../../../module/auth/menu.service';

import { Menu } from '../../../../../model/Menu';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心权限菜单控制器
 * 负责处理与菜单相关的HTTP请求，如获取、删除、更新和初始化菜单
 */
@Controller('/staff/web/userCenter/auth/menu', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterAuthMenuController {
  // 注入MenuService实例
  @Inject()
  private menuService: MenuService = null;
  /**
   * 根据ID获取菜单
   * @param id - 菜单ID
   * @param level - 菜单级别
   * @returns 返回菜单信息
   */
  @All('/getById.json', )
  public async getById(
    @Query('id') id: string,
    @Query('level') level: number
  ): Promise<any> {
    // 调用menuService的getById方法获取菜单信息
    return await this?.menuService?.getById?.(id, level);
  }

  /**
   * 删除菜单
   * @param id - 菜单ID
   * @param level - 菜单级别
   * @returns 返回删除结果
   */
  public async del(
    @Query('id') id: string,
    @Query('level') level: number
  ): Promise<any> {
    // 调用menuService的del方法删除菜单
    await this?.menuService?.del?.(id, level);
  }

  /**
   * 更新菜单
   * @param obj - 菜单对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Menu): Promise<any> {
    // 调用menuService的update方法更新菜单
    return await this?.menuService?.update?.(obj);
  }

  /**
   * 初始化菜单
   * @returns 返回初始化结果
   */
  @All('/init.json', )
  public async init(): Promise<any> {
    // 调用menuService的init方法初始化菜单
    return await this?.menuService?.init();
  }
}
