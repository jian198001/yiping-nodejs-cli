import { BaseModel } from '../module/common/model/BaseModel';
/**
 * 表单提交实体类，继承自 BaseModel
 */
export declare class FormSubmit extends BaseModel {
    /**
     * 表单id，标识符名称来自淘宝开放平台
     */
    formId: string;
    /**
     * 表单代码，标识符名称来自淘宝开放平台
     */
    code: string;
    /**
     * 表单内容，标识符名称来自淘宝开放平台
     */
    content: string;
}
