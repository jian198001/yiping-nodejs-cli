import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 店铺卖家映射实体类
 * 继承自BaseModel，用于关联店铺和卖家的信息
 */
export declare class ShopSellerMap extends BaseModel {
    /**
     * 店铺ID
     * 对应卖家所属店铺的唯一标识
     */
    shopId: string;
    /**
     * 用户角色
     * 对应卖家在店铺中的角色
     */
    userRole: string;
    /**
     * 卖家ID
     * 对应卖家的唯一标识
     */
    sellerId: string;
}
