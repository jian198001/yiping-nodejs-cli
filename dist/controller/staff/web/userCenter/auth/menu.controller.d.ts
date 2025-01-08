import { Menu } from '../../../../../model/Menu';
/**
 * 员工Web用户中心权限菜单控制器
 * 负责处理与菜单相关的HTTP请求，如获取、删除、更新和初始化菜单
 */
export declare class StaffWebUserCenterAuthMenuController {
    private menuService;
    /**
     * 根据ID获取菜单
     * @param id - 菜单ID
     * @param level - 菜单级别
     * @returns 返回菜单信息
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
    /**
     * 初始化菜单
     * @returns 返回初始化结果
     */
    init(): Promise<any>;
}
