import { BaseModel } from '../module/common/model/BaseModel';
/**
 * 表单实体类，继承自 BaseModel
 */
export declare class Form extends BaseModel {
    /**
     * 表单标题
     */
    title: string;
    /**
     * 表单代码
     */
    code: string;
    /**
     * 表单内容
     */
    content: string;
    /**
     * 表单选项
     */
    option: string;
}
