import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 店铺实体类
 * 继承自BaseModel，包含店铺相关的各种信息
 */
export declare class Shop extends BaseModel {
    /**
     * 编码
     * 对应店铺的唯一编码
     */
    code: string;
    /**
     * 邮箱
     * 对应店铺的联系邮箱
     */
    email: string;
    /**
     * 地区编码
     * 对应店铺所在地区的编码
     */
    regionCode: string;
    /**
     * 非营业时间内网店可进行的操作
     * 非营业时间内网店可进行的操作：goods->展示商品,但无法下单；order->可下单支付预订,但延时配送，默认为'order'
     */
    nonBusinessHoursShow: string;
    /**
     * 课程消费类型
     * 课程的消费类型，默认为'courseShift'
     */
    courseConsumeType: string;
    /**
     * 物流范围-快递
     * 物流范围,是同城还是支持全国,是否开启快递配送
     */
    express: string;
    /**
     * 物流范围-同城
     * 物流范围,是同城还是支持national,是否开启同城配送
     */
    sameCity: string;
    /**
     * 物流范围-自提
     * 物流范围,是同城还是支持全国,是否开启线下自提
     */
    pickup: string;
    /**
     * 省份/直辖市
     * 对应店铺所在的省份或直辖市
     */
    province: string;
    city: string;
    /**
     * 区
     * 对应店铺所在的区
     */
    region: string;
    /**
     * 营业时间
     * 对应店铺的营业时间，默认值为'00:00-23:59'
     */
    businessHours: string;
    /**
     * 地区邮编
     * 对应店铺所在地区的邮编
     */
    regionPostcode: string;
    /**
     * 退款设置
     * 0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2'已支付未核销'订单不需人工审核直接退款,默认值0
     */
    refund: string;
    /**
     * 联系电话
     * 对应店铺的联系电话
     */
    phone: string;
    /**
     * 是否支持购物车
     * 是否支持购物车：0->不支持；1->支持，默认为'1'
     */
    cart: string;
    /**
     * 买家订单可见性
     * 买家能看到本商家的订单还是能看到所有商家的订单
     */
    buyerOrder: string;
    /**
     * 备注信息
     * 对应店铺的备注信息
     */
    note: string;
    /**
     * 有效期结束时间
     * 对应店铺的有效期结束时间
     */
    endTimeValid: any;
    /**
     * 利率1
     * 对应店铺的利率1
     */
    iRate1: number;
    /**
     * 利率2
     * 对应店铺的利率2
     */
    iRate2: number;
    /**
     * 卖家ID
     * 对应店铺所属卖家的唯一标识
     */
    sellerId: string;
    /**
     * 联系地址
     * 对应店铺的联系地址：店铺的具体位置,需要经纬度获取,用于手机端店铺街调取店铺精准位置
     */
    address: string;
    /**
     * 昵称
     * 对应店铺的昵称
     */
    nickname: string;
    /**
     * 地区值
     * 对应店铺所在地区的值
     */
    regionValue: string;
    /**
     * 多规格商品的默认SKU规格价格信息
     * 对应多规格商品的默认SKU规格价格信息
     */
    initialSku: string;
    /**
     * 微信支付退款通知URL
     * 对应微信支付退款通知的URL
     */
    wxpayRefundNotifyUrl: string;
    /**
     * 买家销售规则
     * 对应买家销售的规则
     */
    buyerSalesRule: string;
    deliveryArea: string;
}
