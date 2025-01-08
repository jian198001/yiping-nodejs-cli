import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 交易订单实体类
 * 继承自BaseModel，用于存储交易订单的相关信息
 */
export declare class TradeOrder extends BaseModel {
    /**
     * 买家角色
     * 对应买家的角色，默认为'buyer'
     */
    buyerRole: string;
    /**
     * 发票内容
     * 对应发票的具体内容
     */
    billContent: string;
    /**
     * 第三方商户系统内部订单号
     * 要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
     */
    outTradeNo: string;
    /**
     * 详细地址
     * 对应收货人的详细地址
     */
    detailAddress: string;
    /**
     * 收货人邮编
     * 对应收货人的邮政编码
     */
    postCode: string;
    /**
     * 收票人电话
     * 对应收票人的联系电话
     */
    billReceiverPhone: string;
    /**
     * 地址ID
     * 对应收货地址的唯一标识
     */
    receiverAddressId: string;
    /**
     * 物流公司编码
     * 标识符名称来自微信小店
     */
    deliveryCompany: string;
    /**
     * 运费
     * 标识符名称来自淘宝开放平台
     */
    postFee: number;
    /**
     * 省份/直辖市
     * 对应收货地址的省份或直辖市
     */
    province: string;
    /**
     * 店铺备注
     * 对应卖家的店铺备注信息
     */
    shopMemo: string;
    /**
     * 确认收货时间
     * 对应订单的确认收货时间
     */
    receiveTime: any;
    /**
     * 发票类型
     * 0->不开发票；1->电子发票；2->纸质发票
     */
    billType: number;
    /**
     * 物流类型
     * delivery->需物流;eticket->电子凭证不需物流;默认值:eticket(电子凭证不需物流)
     */
    delivery: string;
    /**
     * 修改时间
     * 对应订单的最后修改时间
     */
    modifyTime: any;
    /**
     * 支付时间
     * 标识符名称来自淘宝开放平台
     */
    payTime: any;
    /**
     * 区
     * 对应收货地址的区
     */
    region: string;
    /**
     * 订单状态
     * NOTPAY:待付款,SUCCESS:已付款,DELIVERY:已发货,3:已完成,CLOSED:已关闭,5:无效订单,REFUND:申请退款,VERIFICATION:已核销
     */
    tradeState: string;
    /**
     * 城市
     * 对应收货地址的城市
     */
    city: string;
    /**
     * 支付方式
     * 0->未支付；alipay->支付宝；wxpay->微信；balance->买家余额
     */
    payType: string;
    /**
     * 订单是否被商家已读
     * 0->未读；1->已读
     */
    readHistory: number;
    /**
     * 发票抬头
     * 对应发票的抬头信息
     */
    billHeader: string;
    /**
     * 收票人邮箱
     * 对应收票人的邮箱地址
     */
    billReceiverEmail: string;
    /**
     * 合计各项金额（元）
     * 对应订单中各项金额的合计，格式为JSON字符串
     */
    addAmount: string;
    /**
     * 减免金额（元）
     * 对应订单中的减免金额，格式为JSON字符串
     */
    subAmount: string;
    /**
     *
     * 对应订单中各项金额的合计，格式为JSON字符串
     */
    totalAmount: number;
    deliveryTime: any;
    confirmStatus: string;
    deliveryId: string;
    trueName: string;
    message: string;
    shopId: string;
    shopBuyerId: string;
    phoneNum: string;
}
