import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 店铺微信用户映射实体类
 * 继承自BaseModel，用于关联店铺和微信用户的信息
 */
export declare class ShopWxUserMap extends BaseModel {
    /**
     * 店铺ID
     * 对应微信用户所属店铺的唯一标识
     */
    shopId: string;
    /**
     * 用户角色
     * 对应微信用户在店铺中的角色
     */
    userRole: string;
    /**
     * 微信用户OpenID
     * 对应微信用户的唯一标识
     */
    openId: string;
}
