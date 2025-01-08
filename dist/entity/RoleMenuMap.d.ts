import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 角色菜单映射实体类
 * 继承自BaseModel，用于存储角色和菜单之间的映射关系
 */
export declare class RoleMenuMap extends BaseModel {
    /**
     * 角色ID
     * 对应角色的唯一标识
     */
    roleId: string;
    /**
     * 菜单ID
     * 对应菜单的唯一标识
     */
    menuId: string;
}
