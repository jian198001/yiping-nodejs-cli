import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 库存实体类
 * 继承自BaseModel，用于存储库存相关的信息
 */
export declare class Stock extends BaseModel {
    /**
     * 物料ID
     * 对应库存物料的唯一标识
     */
    materialId: string;
    /**
     * 库存单位
     * 对应库存物料的库存单位
     */
    sku: string;
    /**
     * 库存数量
     * 对应库存物料的数量，标识符名称来自支付宝
     */
    quantity: number;
    /**
     * 失效日期
     * 对应库存物料的失效日期
     */
    exp: any;
}
