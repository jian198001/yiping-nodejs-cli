import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 密码实体类
 * 用于表示密码的基本信息
 */
export declare class Password extends BaseModel {
    /**
     * 最小长度
     * 密码的最小长度
     */
    minlength: number;
    /**
     * 最大长度
     * 密码的最大长度
     */
    maxlength: number;
}
