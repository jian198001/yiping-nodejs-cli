import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 收藏实体类，继承自 BaseModel
 */
export declare class Favor extends BaseModel {
    /**
     * 商品id，标识符名称来自淘宝开放平台
     */
    goodsId: string;
    /**
     * 店铺买家id，标识符名称来自淘宝开放平台
     */
    shopBuyerId: string;
}
