import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 入库单实体类
 * 用于表示入库单的基本信息
 */
export declare class Inbill extends BaseModel {
    /**
     * 买家角色
     * 入库单的买家角色，默认值为'buyer'
     */
    buyerRole: string;
    /**
     * 收银订单标识
     * 标识该订单是否为收银订单，1表示收银，0或null表示非收银
     */
    cash: string;
    /**
     * 发票内容
     * 入库单的发票内容
     */
    billContent: string;
    /**
     * 外部交易号
     * 第三方商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
     */
    outTradeNo: string;
    /**
     * 详细地址
     * 入库单的详细收货地址
     */
    detailAddress: string;
    /**
     * 邮编
     * 入库单的收货地址邮编
     */
    postCode: string;
    /**
     * 收票人电话
     * 入库单的收票人电话号码
     */
    billReceiverPhone: string;
    /**
     * 收货地址ID
     * 入库单的收货地址唯一标识
     */
    receiverAddressId: string;
    /**
     * 物流公司编码
     * 入库单的物流公司编码，标识符名称来自微信小店
     */
    deliveryCompany: string;
    /**
     * 运费
     * 入库单的运费金额，标识符名称来自淘宝开放平台
     */
    postFee: number;
    /**
     * 省份
     * 入库单的收货地址省份/直辖市
     */
    province: string;
    /**
     * 店铺备注
     * 入库单的店铺备注信息
     */
    shopMemo: string;
    /**
     * 确认收货时间
     * 入库单的确认收货时间
     */
    receiveTime: any;
    /**
     * 发票类型
     * 入库单的发票类型，0表示不开发票，1表示电子发票，2表示纸质发票
     */
    billType: number;
    /**
     * 物流类型
     * 入库单的物流类型，delivery表示需物流，eticket表示电子凭证不需物流，默认值为eticket
     */
    delivery: string;
    /**
     * 修改时间
     * 入库单的最后修改时间
     */
    modifyTime: any;
    /**
     * 支付时间
     * 入库单的支付时间，标识符名称来自淘宝开放平台
     */
    payTime: any;
    /**
     * 运费承担方式
     * 入库单的运费承担方式，可选值为shop（卖家承担）和buyer（买家承担），默认值为shop
     */
    freightPayer: string;
    /**
     * 区
     * 入库单的收货地址区
     */
    region: string;
    /**
     * 订单状态
     * 入库单的状态，NOTPAY表示待付款，SUCCESS表示已付款，DELIVERY表示已发货，3表示已完成，CLOSED表示已关闭，5表示无效订单，REFUND表示申请退款，VERIFICATION表示已核销
     */
    tradeState: string;
    /**
     * 物流单号
     * 入库单的物流单号
     */
    deliverySn: string;
    /**
     * 城市
     * 入库单的收货地址城市
     */
    city: string;
    /**
     * 支付方式
     * 入库单的支付方式，0表示未支付，alipay表示支付宝，wxpay表示微信，balance表示买家余额
     */
    payType: string;
    /**
     * 订单阅读历史
     * 入库单是否被商家已读
     */
    readHistory: number;
    /**
     * 发票抬头
     * 入库单的发票抬头
     */
    billHeader: string;
    /**
     * 收票人邮箱
     * 入库单的收票人邮箱
     */
    billReceiverEmail: string;
    /**
     * 订单总金额
     * 入库单的订单总金额
     */
    totalAmount: number;
    /**
     * 发货时间
     * 入库单的发货时间
     */
    deliveryTime: any;
    /**
     * 确认状态
     * 入库单的确认状态
     */
    confirmStatus: string;
    /**
     * 发货ID
     * 入库单的发货ID
     */
    deliveryId: string;
    /**
     * 收货人姓名
     * 入库单的收货人姓名
     */
    trueName: string;
    /**
     * 留言
     * 入库单的留言信息
     */
    message: string;
    /**
     * 店铺买家ID
     * 入库单的店铺买家ID
     */
    shopBuyerId: string;
    /**
     * 电话号码
     * 入库单的电话号码
     */
    phoneNum: string;
}
