import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { PurchaseOrderItem } from '../../../../../entity/PurchaseOrderItem';
/**
 * 员工用户中心采购订单项控制器
 */
export declare class StaffWebUserCenterPurchaseOrderPurchaseOrderController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入采购订单项服务
     */
    private purchaseOrderItemService;
    /**
     * 获取采购订单项分页列表
     *
     * @param orderId - 订单ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(orderId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取采购订单项信息
     *
     * @param id - 采购订单项ID
     * @returns 返回采购订单项信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新采购订单项信息
     *
     * @param obj - 采购订单项对象
     * @returns 返回更新结果
     */
    update(obj: PurchaseOrderItem): Promise<any>;
}
