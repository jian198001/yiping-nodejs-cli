import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 售后单实体类
 * 继承自BaseModel，包含售后单相关的各种信息
 */
export declare class Aftersale extends BaseModel {
    /**
     * 商家自定义订单ID
     */
    outOrderId: string;
    /**
     * 商家自定义售后ID
     */
    outAftersaleId: string;
    /**
     * 商家小程序该售后单的页面path
     * 不存在则使用订单path
     */
    path: string;
    /**
     * 售后类型
     * 1:退款,2:退款退货,3:换货
     */
    type: string;
    /**
     * 售后状态
     * 0:未受理,1:用户取消,2:商家受理中,3:商家逾期未处理,4:商家拒绝退款,5:商家拒绝退货退款,6:待买家退货,7:退货退款关闭,8:待商家收货,11:商家退款中,12:商家逾期未退款,13:退款完成,14:退货退款完成,15:换货完成,16:待商家发货,17:待用户确认收货,18:商家拒绝换货,19:商家已收到货
     */
    status: string;
    /**
     * 订单所有商品售后完成状态
     * 0:订单存在可售后商品，1:订单所有商品售后完成（订单维度）
     */
    finishAllAftersale: string;
    /**
     * 退货相关商品列表
     */
    goodsInfos: string;
    /**
     * 退款原因
     */
    refundReason: string;
}
