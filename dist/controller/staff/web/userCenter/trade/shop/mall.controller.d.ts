import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { Mall } from '../../../../../../entity/Mall';
/**
 * 员工用户中心店铺商城控制器
 */
export declare class StaffWebUserCenterShopMallController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入商城服务
     */
    private mallService;
    /**
     * 获取商城分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取商城信息
     *
     * @param id - 商城ID
     * @returns 返回商城信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新商城信息
     *
     * @param obj - 商城对象
     * @returns 返回更新结果
     */
    update(obj: Mall): Promise<any>;
}
