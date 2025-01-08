import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
/**
 * 员工用户中心买家分账控制器
 */
export declare class StaffWebUserCenterTradeOrderBuyerProfitSharingController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入分账服务
     */
    private profitSharingService;
    /**
     * 获取分账分页列表
     *
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(shopBuyerId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取分账信息
     *
     * @param id - 分账ID
     * @returns 返回分账信息
     */
    getById(id: string): Promise<any>;
}
