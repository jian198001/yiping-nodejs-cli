import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { PurchaseOrderItem } from '../../entity/PurchaseOrderItem';
/**
 * 采购订单项服务类
 * 提供采购订单项的分页查询、根据ID查询、删除、更新、生成出库单号、订单计数、支付宝手机网站支付、支付宝退款、支付宝关闭订单、微信支付统一下单、减库存、设置发货信息、积分转换金额等功能
 */
export declare class PurchaseOrderItemService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询采购订单项
     * @param orderId - 订单ID
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(orderId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询采购订单项
     * @param id - 采购订单项ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除采购订单项
     * @param ids - 采购订单项ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新采购订单项
     * @param obj - 采购订单项对象
     * @returns 更新后的采购订单项
     */
    update(obj: PurchaseOrderItem): Promise<PurchaseOrderItem>;
    /**
     * 生成出库单号
     * @returns 生成的出库单号
     */
    getOutPurchaseNo(): Promise<string>;
    /**
     * 订单计数
     * @param shopBuyerId - 店铺买家ID
     * @param shopId - 店铺ID
     * @returns 无返回值
     */
    orderCount(shopBuyerId?: string, shopId?: string): Promise<void>;
    /**
     * 支付宝手机网站支付
     * @param orderId - 订单ID
     * @returns 无返回值
     */ g: any;
    alipayRefund(orderId: string): Promise<void>;
    alipayClose(orderId: string): Promise<void>;
    wxpayUnifiedOrder(orderId: string): Promise<void>;
    subStock(orderId: string, subStockType: string): Promise<void>;
    setDelivery(orderId: string, deliveryCompany: string, deliveryTrackNo: string, needDelivery: string, isOthers: string): Promise<void>;
    bonusToAmount(bonus: number, rate: number): Promise<number>;
}
