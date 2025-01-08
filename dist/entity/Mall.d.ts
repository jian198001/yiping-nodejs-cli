import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商城实体类
 * 用于表示商城的基本信息
 */
export declare class Mall extends BaseModel {
    /**
     * 二级返佣比例
     * 商城的二级返佣比例
     */
    iRate2: number;
    /**
     * 一级返佣比例
     * 商城的一级返佣比例
     */
    iRate1: number;
    /**
     * 备注信息
     * 商城的备注信息
     */
    note: string;
    /**
     * 买家订单权限
     * 买家能看到本商家的订单还是能看到所有商家的订单
     */
    buyerOrder: string;
    /**
     * 购物车支持
     * 是否支持购物车：0->不支持；1->支持
     */
    cart: string;
    /**
     * 退款规则
     * 0任何状态下都需要人工审核才可以退款1如订单是已支付状态下,不需人工审核可直接退款2'已支付未核销'订单不需人工审核直接退款,3不允许申请退款默认值0
     */
    refund: string;
    /**
     * 营业时间
     * 商城的营业时间，默认值：00:00-23:59
     */
    businessHours: string;
    /**
     * 联系地址
     * 店铺的具体位置，需要经纬度获取，用于手机端店铺街调取店铺精准位置
     */
    region: string;
    /**
     * 省份/直辖市
     * 商城所在的省份/直辖市
     */
    province: string;
    /**
     * 非营业时间操作
     * 非营业时间内网店可进行的操作：goods->展示商品，但无法下单；order->可下单支付，但暂缓配送
     */
    nonBusinessHoursShow: string;
    /**
     * 物流范围
     * 商城的物流范围，是同城还是支持全国
     */
    deliveryArea: string;
    /**
     * 邮箱
     * 商城的联系邮箱
     */
    email: string;
    /**
     * 微信支付通知URL
     * 微信支付成功后的通知URL
     */
    wxpayNotifyUrl: string;
    /**
     * 买家分销
     * 是否开启分销
     */
    buyerSales: string;
    /**
     * 门店自提
     * 门店是否支持门店自提，0->不支持；1->支持
     */
    obs: string;
    /**
     * 支付类型
     * 商户是使用本商户的微信支付宝收款信息进行收款，还是使用商城的收款信息进行收款:shop:本商户,mall:商城,默认mall
     */
    payType: string;
    /**
     * 营业状态
     * 商城的营业状态
     */
    status: string;
    /**
     * 城市
     * 商城所在的城市
     */
    city: string;
    /**
     * 区域ID
     * 商城所在的区域ID
     */
    areaId: string;
    /**
     * 微信支付退款通知URL
     * 微信支付退款成功后的通知URL
     */
    wxpayRefundNotifyUrl: string;
    /**
     * 买家分销规则
     * 买家分销的规则
     */
    buyerSalesRule: string;
    /**
     * 昵称
     * 商城的昵称
     */
    nickName: string;
    /**
     * 初始SKU
     * 多规格商品的默认SKU规格价格信息
     */
    initialSku: string;
    /**
     * 最后登录时间
     * 商城的最后登录时间
     */
    loginTime: any;
    /**
     * 地址
     * 商城的详细地址
     */
    address: string;
    /**
     * 营业开始时间
     * 商城的营业开始时间，默认值：00:00
     */
    startTime: any;
    /**
     * 营业结束时间
     * 商城的营业结束时间，默认值：23:59
     */
    endTime: any;
}
