import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 组织实体类
 * 用于表示组织的基本信息
 */
export declare class Org extends BaseModel {
    /**
     * 上级组织ID
     * 组织的上级组织ID
     */
    parentId: string;
    /**
     * 组织代码
     * 组织的代码
     */
    code: string;
}
