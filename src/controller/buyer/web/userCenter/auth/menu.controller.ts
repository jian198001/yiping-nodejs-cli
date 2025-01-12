import { All, Body, Controller, Inject, Query } from '@midwayjs/decorator';

import { MenuService } from '../../../../../module/auth/menu.service';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

import { Menu } from '../../../../../model/Menu';

/**
 * 买家Web用户中心认证菜单控制器
 * 处理与菜单相关的HTTP请求，如根据ID查询、删除、更新和初始化
 */
@Controller('/buyer/web/userCenter/auth/menu', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerWebUserCenterAuthMenuController {
  // 注入MenuService实例
  @Inject()
  private menuService: MenuService = null;
  /**
   * 根据ID查询菜单
   * @param id - 菜单ID
   * @param level - 菜单级别
   * @returns 返回查询结果
   */
  @All('/getById.json')
  public async getById(
    @Query('id') id: string,
    @Query('level') level: number
  ): Promise<any> {
    // 调用menuService的getById方法根据ID和级别查询菜单
    return await this?.menuService?.getById?.(id, level);
  }

  /**
   * 删除菜单
   * @param id - 菜单ID
   * @param level - 菜单级别
   * @returns 返回删除结果
   */
  @All('/del.json')
  public async del(
    @Query('id') id: string,
    @Query('level') level: number
  ): Promise<any> {
    // 调用menuService的del方法根据ID和级别删除菜单
    await this?.menuService?.del?.(id, level);
     return {} ;
  }

  /**
   * 更新菜单
   * @param obj - 菜单对象
   * @returns 返回更新结果
   */
  @All('/update.json')
  public async update(@Body() obj: Menu): Promise<any> {
    // 调用menuService的update方法更新菜单
    return await this?.menuService?.update?.(obj);
  }

}
