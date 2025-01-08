import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 出库单实体类
 * 用于表示出库单的基本信息
 */
export declare class Outbill extends BaseModel {
    /**
     * 出库单内容
     * 出库单的详细内容
     */
    billContent: string;
    /**
     * 详细地址
     * 收货人的详细地址
     */
    detailAddress: string;
    /**
     * 邮编
     * 收货人的邮编
     */
    postCode: string;
    /**
     * 收货人电话
     * 收货人的电话号码
     */
    billReceiverPhone: string;
    /**
     * 收货地址ID
     * 收货地址的唯一标识
     */
    receiverAddressId: string;
    /**
     * 快递公司
     * 负责配送的快递公司名称
     */
    deliveryCompany: string;
    /**
     * 邮费
     * 订单的邮费金额
     */
    postFee: number;
    /**
     * 省份
     * 收货地址所在的省份
     */
    province: string;
    /**
     * 店铺备注
     * 店铺对该订单的备注信息
     */
    shopMemo: string;
    /**
     * 收货时间
     * 预计的收货时间
     */
    receiveTime: any;
    /**
     * 单据类型
     * 出库单的类型
     */
    billType: number;
    /**
     * 配送方式
     * 订单的配送方式
     */
    delivery: string;
    /**
     * 修改时间
     * 出库单的最后修改时间
     */
    modifyTime: any;
    /**
     * 支付时间
     * 订单的支付时间
     */
    payTime: any;
    /**
     * 运费支付方
     * 承担运费的一方
     */
    freightPayer: string;
    /**
     * 地区
     * 收货地址所在的地区
     */
    region: string;
    /**
     * 交易状态
     * 订单的交易状态
     */
    tradeState: string;
    /**
     * 物流单号
     * 快递公司提供的物流单号
     */
    deliverySn: string;
    /**
     * 城市
     * 收货地址所在的城市
     */
    city: string;
    /**
     * 支付类型
     * 订单的支付方式类型
     */
    payType: string;
    /**
     * 阅读历史
     * 订单的阅读历史状态
     */
    readHistory: number;
    /**
     * 单据抬头
     * 出库单的抬头信息
     */
    billHeader: string;
    /**
     * 收货人邮箱
     * 收货人的邮箱地址
     */
    billReceiverEmail: string;
    /**
     * 总金额
     * 订单的总金额
     */
    totalAmount: number;
    /**
     * 发货时间
     * 订单的发货时间
     */
    deliveryTime: any;
    /**
     * 确认状态
     * 订单的确认状态
     */
    confirmStatus: string;
    /**
     * 发货ID
     * 发货记录的唯一标识
     */
    deliveryId: string;
    /**
     * 真实姓名
     * 收货人的真实姓名
     */
    trueName: string;
    /**
     * 留言
     * 买家对订单的留言信息
     */
    message: string;
    /**
     * 店铺买家ID
     * 购买该订单的店铺买家ID
     */
    shopBuyerId: string;
    /**
     * 电话号码
     * 收货人的电话号码
     */
    phoneNum: string;
    /**
     * 评论时间
     * 订单的评论时间
     */
    commentTime: any;
}
