import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 移动端模块实体类
 * 用于表示移动端模块的基本信息
 */
export declare class MobileModule extends BaseModel {
    /**
     * 模块路径
     * 移动端模块的路径
     */
    path: string;
    /**
     * 表单ID
     * 关联的表单的唯一标识
     */
    formId: string;
}
