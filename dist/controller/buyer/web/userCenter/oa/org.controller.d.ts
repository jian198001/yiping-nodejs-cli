import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Org } from '../../../../../entity/Org';
/**
 * 买家Web用户中心OA组织控制器
 * 处理与组织相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class BuyerWebUserCenterDeptOrgController {
    private ctx;
    private logger;
    private orgService;
    /**
     * 分页查询组织
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询组织
     * @param id - 组织ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除组织
     * @param ids - 组织ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新组织
     * @param obj - 组织对象
     * @returns 返回更新结果
     */
    update(obj: Org): Promise<any>;
}
