import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 拍卖活动实体类
 * 继承自BaseModel，包含拍卖活动相关的各种信息
 */
export declare class AuctionActivity extends BaseModel {
    /**
     * 店铺ID
     * 对应拍卖活动所属店铺的唯一标识
     */
    shopId: string;
    /**
     * 拍卖活动标题
     * 对应拍卖活动的标题
     */
    title: string;
    /**
     * 拍卖开始时间
     * 对应拍卖活动的开始时间
     */
    startTime: any;
    /**
     * 商品类目ID
     * 对应拍卖活动所属商品类目的唯一标识
     */
    goodsCategoryId: string;
}
