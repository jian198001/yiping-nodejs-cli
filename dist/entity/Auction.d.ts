import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 拍卖实体类
 * 继承自BaseModel，包含拍卖相关的各种信息
 */
export declare class Auction extends BaseModel {
    /**
     * 商品ID
     * 对应拍卖商品的唯一标识
     */
    goodsId: string;
    /**
     * 拍品起拍价
     * 对应拍卖商品的起始价格
     */
    startPrice: number;
    /**
     * 拍品底价
     * 对应拍卖商品的底价
     */
    comp: number;
    /**
     * 审批状态
     * deny拒绝 permit同意
     */
    approve: string;
    /**
     * 审批拒绝理由
     */
    msg: string;
    /**
     * 拍卖活动ID
     * 对应拍卖活动的唯一标识
     */
    auctionActivityId: string;
    /**
     * 拍卖结束时间
     * 对应拍卖活动的结束时间
     */
    endTime: any;
    /**
     * 订单卖家备注
     * 对应订单卖家的备注信息
     */
    shopMemo: string;
    /**
     * 保留价
     * 对应拍卖商品的保留价格
     */
    reservePrice: number;
    /**
     * 会员最高价
     * 对应会员出价的最高价格
     */
    maxPrice: number;
    /**
     * 佣金比例
     * 对应拍卖商品的佣金比例
     */
    incrementRange: number;
}
