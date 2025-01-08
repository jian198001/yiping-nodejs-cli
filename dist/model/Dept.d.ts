import { ObjectId } from 'mongoose';
/**
 * 部门实体类
 * 用于表示部门的基本信息
 */
export declare class Dept {
    /**
     * 部门ID
     * 唯一标识一个部门
     */
    id: ObjectId;
    /**
     * 部门名称
     * 部门的名称
     */
    name?: string;
    /**
     * 部门层级
     * 部门的层级
     */
    level?: number;
    /**
     * 子部门列表
     * 部门的子部门列表
     */
    children?: Dept[];
}
