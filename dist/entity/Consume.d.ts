import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 物料领用记录实体类
 *
 * 该类用于定义物料领用记录的基本信息，包括员工ID、物料ID和购买数量。
 * 所有标识符名称均来自支付宝。
 */
export declare class Consume extends BaseModel {
    /**
     * 员工ID
     *
     * 领用物料的员工的唯一标识符。
     */
    staffId: string;
    /**
     * 物料ID
     *
     * 被领用物料的唯一标识符。
     */
    materialId: string;
    /**
     * 购买数量
     *
     * 领用的物料数量。
     */
    quantity: number;
}
