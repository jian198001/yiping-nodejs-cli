import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 菜单表单映射实体类
 * 用于表示菜单与表单之间的映射关系
 */
export declare class MenuFormMap extends BaseModel {
    /**
     * 菜单ID
     * 关联的菜单的唯一标识
     */
    menuId: string;
    /**
     * 表单ID
     * 关联的表单的唯一标识
     */
    formId: string;
}
