import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 系统参数实体类
 * 继承自BaseModel，用于存储系统参数的信息
 */
export declare class SysParams extends BaseModel {
    /**
     * 参数标签
     * 对应系统参数的标签，用于标识参数的用途
     */
    label: string;
    /**
     * 输入类型
     * 对应系统参数的输入类型，可选值为'text'（字符串）、'number'（浮点数）、'int'（整数）
     */
    inputType: string;
    /**
     * 参数值
     * 对应系统参数的具体值
     */
    value: string;
}
