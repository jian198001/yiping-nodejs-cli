import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Staff } from '../../../../../entity/Staff';
/**
 * 员工Web用户中心OA员工控制器
 * 处理与员工相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterDeptStaffController {
    private ctx;
    private logger;
    private staffService;
    /**
     * 分页查询员工
     * @param deptId - 部门ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(deptId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 分页查询未分配员工
     * @param deptId - 部门ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    unallocatedPage(deptId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询员工
     * @param id - 员工ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除员工
     * @param ids - 员工ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新员工
     * @param obj - 员工对象
     * @returns 返回更新结果
     */
    update(obj: Staff): Promise<any>;
}
