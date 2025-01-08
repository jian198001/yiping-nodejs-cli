import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 对话框实体类
 *
 * 该类用于定义对话框的基本信息，包括路径和表单ID。
 * 所有标识符名称均来自支付宝。
 */
export declare class Dlg extends BaseModel {
    /**
     * 路径
     *
     * 对话框的路径或URL。
     */
    path: string;
    /**
     * 表单ID
     *
     * 对话框关联的表单的唯一标识符。
     */
    formId: string;
}
