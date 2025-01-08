import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 生产厂家实体类，继承自 BaseModel
 */
export declare class Factory extends BaseModel {
    /**
     * 厂址，标识符名称来自淘宝开放平台
     */
    factorySite: string;
    /**
     * 厂家联系方式，标识符名称来自淘宝开放平台
     */
    contact: string;
}
