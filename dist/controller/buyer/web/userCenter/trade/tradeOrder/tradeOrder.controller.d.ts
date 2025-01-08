import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { TradeOrder } from '../../../../../../entity/TradeOrder';
/**
 * 买家Web用户中心交易订单控制器
 * 处理与交易订单相关的HTTP请求，如创建订单、分页查询、根据ID查询、更新、审核退款和获取图表数据
 */
export declare class BuyerWebUserCenterTradeOrderTradeOrderController {
    private ctx;
    private logger;
    private tradeOrderService;
    /**
     * 创建订单
     * @param shopId - 店铺ID
     * @returns 返回创建订单的结果
     */
    createOrder(shopId: any): Promise<any>;
    /**
     * 分页查询交易订单
     * @param tradeState - 交易状态
     * @param shopId - 店铺ID
     * @param shopBuyerId - 买家ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(tradeState: string, shopId: any, shopBuyerId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询交易订单
     * @param id - 订单ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 更新交易订单
     * @param obj - 交易订单对象
     * @returns 返回更新结果
     */
    update(obj: TradeOrder): Promise<any>;
    /**
     * 审核退款
     * @param orderId - 订单ID
     * @returns 返回审核退款的结果
     */
    auditRefund(orderId: string): Promise<any>;
    /**
     * 获取交易订单图表数据
     * @returns 返回图表数据
     */
    chart(): Promise<any>;
}
