import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { PurchaseOrder } from '../../../../../entity/PurchaseOrder';
import { Material } from '../../../../../entity/Material';
import { PurchaseOrderItem } from '../../../../../entity/PurchaseOrderItem';
/**
 * 员工用户中心采购订单控制器
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
     * 注入采购订单服务
     */
    private purchaseOrderService;
    /**
     * 获取采购订单分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取采购订单信息
     *
     * @param id - 采购订单ID
     * @returns 返回采购订单信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新采购订单信息
     *
     * @param obj - 采购订单对象
     * @returns 返回更新结果
     */
    update(obj: PurchaseOrder): Promise<any>;
    /**
     * 提交采购订单
     *
     * @param id - 采购订单ID
     * @returns 返回提交结果
     */
    submit(id: any): Promise<any>;
    /**
     * 更新采购订单项信息
     *
     * @param obj - 物料对象
     * @param purchaseOrderItem - 采购订单项对象
     * @param type - 更新类型
     * @returns 返回更新结果
     */
    updateItem(obj: Material, purchaseOrderItem: PurchaseOrderItem, type: string): Promise<any>;
    /**
     * 删除采购订单
     *
     * @param ids - 采购订单ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
}
