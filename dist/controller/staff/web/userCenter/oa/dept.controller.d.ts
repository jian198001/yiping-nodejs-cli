import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Dept } from '../../../../../entity/Dept';
/**
 * 员工Web用户中心OA部门控制器
 * 处理与部门相关的HTTP请求，如分页查询、根据ID查询、更新
 */
export declare class StaffWebUserCenterDeptDeptController {
    private ctx;
    private logger;
    private deptService;
    /**
     * 分页查询部门
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询部门
     * @param id - 部门ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 更新部门
     * @param obj - 部门对象
     * @returns 返回更新结果
     */
    update(obj: Dept): Promise<any>;
}
