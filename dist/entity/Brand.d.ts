import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 品牌实体类
 * 继承自BaseModel，包含品牌相关的各种信息
 */
export declare class Brand extends BaseModel {
    /**
     * 专区大图
     * 对应品牌专区的大图
     */
    bigPic: string;
    /**
     * 品牌logo
     * 对应品牌的logo图片
     */
    logo: string;
    /**
     * 品牌故事
     * 对应品牌的故事介绍
     */
    brandStory: string;
    /**
     * 店铺ID
     * 对应品牌所属店铺的唯一标识
     */
    shopId: string;
    /**
     * 是否为品牌制造商
     * 0表示不是，1表示是
     */
    factoryStatus: number;
}
