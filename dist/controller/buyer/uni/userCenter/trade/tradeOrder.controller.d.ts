import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { TradeOrder } from '../../../../../entity/TradeOrder';
/**
 * 买家用户中心交易订单控制器
 */
export declare class BuyerUniUserCenterTradeOrderTradeOrderController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入交易订单服务
     */
    private tradeOrderService;
    /**
     * 获取交易订单分页列表
     *
     * @param tradeState - 交易状态
     * @param shopId - 店铺ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(tradeState: string, shopId: any, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 统计不同交易状态的订单数量
     *
     * @param shopId - 店铺ID
     * @returns 返回统计结果
     */
    countTradeState(shopId: any): Promise<any>;
    /**
     * 根据ID获取交易订单
     *
     * @param id - 交易订单ID
     * @returns 返回交易订单信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新交易订单
     *
     * @param obj - 交易订单对象
     * @returns 返回更新结果
     */
    update(obj: TradeOrder): Promise<any>;
    /**
     * 根据购物车信息创建订单
     *
     * @param cartItems - 购物车项
     * @param shopId - 店铺ID
     * @returns 返回创建结果
     */
    createOrder(cartItems: string[], shopId: any): Promise<any>;
    /**
     * 立即购买
     *
     * @param totalAmount - 总金额
     * @param message - 留言
     * @returns 返回购买结果
     */
    amountBuy(totalAmount?: number, message?: string): Promise<any>;
    /**
     * 立即购买
     *
     * @param map - 参数映射
     * @returns 返回购买结果
     */
    buy(map: any): Promise<any>;
    /**
     * 更新订单地址
     *
     * @param id - 订单ID
     * @param addressId - 地址ID
     * @returns 返回更新结果
     */
    updateAddress(id: string, addressId: string): Promise<any>;
    /**
     * 更新订单留言
     *
     * @param id - 订单ID
     * @param message - 留言
     * @returns 返回更新结果
     */
    updateMessage(id: string, message: string): Promise<any>;
    /**
     * 微信支付统一下单
     *
     * @param id - 订单ID
     * @returns 返回下单结果
     */
    wxpayUnifiedOrder(id: string): Promise<any>;
}
