import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Role } from '../../../../../entity/Role';
/**
 * 员工Web用户中心权限角色控制器
 * 负责处理与角色相关的HTTP请求，如分页查询、根据ID查询、删除、更新和更新数据范围
 */
export declare class StaffWebUserCenterAuthRoleController {
    private ctx;
    private logger;
    private roleService;
    /**
     * 分页查询角色
     * @param userId - 用户ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(userId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询角色
     * @param id - 角色ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除角色
     * @param ids - 角色ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新角色
     * @param obj - 角色对象
     * @returns 返回更新结果
     */
    update(obj: Role): Promise<any>;
    /**
     * 更新角色数据范围
     * @param obj - 角色对象
     * @returns 返回更新结果
     */
    updateDataScope(obj: Role): Promise<any>;
}
