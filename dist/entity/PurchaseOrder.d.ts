import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 采购订单实体类
 * 用于表示采购订单的基本信息
 */
export declare class PurchaseOrder extends BaseModel {
    /**
     * 订单标题
     * 采购订单的标题
     */
    title: string;
    /**
     * 买家角色
     * 采购订单的买家角色，默认值为'buyer'
     */
    buyerRole: string;
    /**
     * 收银订单标识
     * 标识该订单是否为收银订单，1表示收银，0或null表示非收银
     */
    cash: string;
    /**
     * 发票内容
     * 采购订单的发票内容
     */
    billContent: string;
    /**
     * 外部交易号
     * 第三方商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
     */
    outTradeNo: string;
    /**
     * 详细地址
     * 采购订单的详细收货地址
     */
    detailAddress: string;
    /**
     * 邮编
     * 采购订单的收货地址邮编
     */
    postCode: string;
    /**
     * 收票人电话
     * 采购订单的收票人电话号码
     */
    billReceiverPhone: string;
    /**
     * 收货地址ID
     * 采购订单的收货地址唯一标识
     */
    receiverAddressId: string;
    /**
     * 物流公司编码
     * 采购订单的物流公司编码，标识符名称来自微信小店
     */
    deliveryCompany: string;
    /**
     * 运费
     * 采购订单的运费金额，标识符名称来自淘宝开放平台
     */
    postFee: number;
    /**
     * 省份
     * 采购订单的收货地址省份/直辖市
     */
    province: string;
    /**
     * 店铺备注
     * 采购订单的店铺备注信息
     */
    shopMemo: string;
    /**
     * 确认收货时间
     * 采购订单的确认收货时间
     */
    receiveTime: any;
    /**
     * 发票类型
     * 采购订单的发票类型，0表示不开发票，1表示电子发票，2表示纸质发票
     */
    billType: number;
    /**
     * 物流类型
     * 采购订单的物流类型，delivery表示需物流，eticket表示电子凭证不需物流，默认值为eticket
     */
    delivery: string;
    /**
     * 修改时间
     * 采购订单的最后修改时间
     */
    modifyTime: any;
    /**
     * 支付时间
     * 采购订单的支付时间，标识符名称来自淘宝开放平台
     */
    payTime: any;
    /**
     * 运费承担方式
     * 采购订单的运费承担方式，可选值为shop（卖家承担）和buyer（买家承担），默认值为shop
     */
    freightPayer: string;
    /**
     * 区
     * 采购订单的收货地址区
     */
    region: string;
    /**
     * 订单状态
     * 采购订单的状态，NOTPAY表示待付款，SUCCESS表示已付款，DELIVERY表示已发货，3表示已完成，CLOSED表示已关闭，5表示无效订单，REFUND表示申请退款，VERIFICATION表示已核销
     */
    tradeState: string;
    /**
     * 城市
     * 采购订单的收货地址城市
     */
    city: string;
    /**
     * 支付方式
     * 采购订单的支付方式，0表示未支付，alipay表示支付宝，wxpay表示微信，balance表示买家余额
     */
    payType: string;
    /**
     * 订单阅读历史
     * 采购订单是否被商家已读
     */
    readHistory: string;
    billHeader: string;
    billReceiverEmail: string;
    totalAmount: number;
    deliveryTime: any;
    confirmStatus: string;
    deliveryId: string;
    trueName: string;
    message: string;
    shopId: string;
    shopBuyerId: string;
    phoneNum: string;
    commentTime: any;
    createUserId: string;
}
