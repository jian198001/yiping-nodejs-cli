import { Menu } from '../../../../../model/Menu';
/**
 * 买家Web用户中心认证菜单控制器
 * 处理与菜单相关的HTTP请求，如根据ID查询、删除、更新和初始化
 */
export declare class BuyerWebUserCenterAuthMenuController {
    private menuService;
    /**
     * 根据ID查询菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回查询结果
     */
    getById(id: string, level: number): Promise<any>;
    /**
     * 删除菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回删除结果
     */
    del(id: string, level: number): Promise<any>;
    /**
     * 更新菜单
     * @param obj - 菜单对象
     * @returns 返回更新结果
     */
    update(obj: Menu): Promise<any>;
}
