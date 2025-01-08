import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 标签用户列表实体类
 * 继承自BaseModel，用于存储标签和用户之间的关联关系
 */
export declare class TagListUser extends BaseModel {
    /**
     * 买家ID
     * 对应买家的唯一标识
     */
    shopBuyerId: string;
    /**
     * 标签ID
     * 对应标签的唯一标识
     */
    tagId: string;
}
