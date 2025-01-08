import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 最新出价实体类
 * 用于表示最新出价的相关信息
 */
export declare class LatestBid extends BaseModel {
    /**
     * 买家ID
     * 出价的买家的唯一标识
     */
    shopBuyerId: string;
    /**
     * 出价时间
     * 出价的时间
     */
    bidTime: any;
    /**
     * 出价类型
     * 出价的类型
     */
    bidType: string;
    /**
     * 拍卖ID
     * 出价所属的拍卖的唯一标识
     */
    auctionId: string;
    /**
     * 出价金额
     * 出价的金额，以元为单位
     */
    bidPrice: number;
}
