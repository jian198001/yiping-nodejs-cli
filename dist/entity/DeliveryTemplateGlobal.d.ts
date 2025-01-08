import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 配送模板全局设置实体类
 *
 * 该类用于定义配送模板全局设置的基本信息，包括起步费用、计价方式、店铺ID、加价标准、区域ID、父级ID、加价费用、起步标准、是否为默认和区域名称。
 * 所有标识符名称均来自支付宝。
 */
export declare class DeliveryTemplateGlobal extends BaseModel {
    /**
     * 起步费用
     *
     * 表示该配送模板全局设置的起步费用。
     */
    startFees: number;
    /**
     * 计价方式
     *
     * 表示该配送模板全局设置的计价方式，例如按重量、体积或件数计价。
     */
    valuation: string;
    /**
     * 店铺ID
     *
     * 表示该配送模板全局设置所对应的店铺ID。
     */
    shopId: string;
    /**
     * 加价标准
     *
     * 表示该配送模板全局设置的加价标准，例如每增加一定重量或体积的加价费用。
     */
    ddStandards: number;
    /**
     * 区域ID
     *
     * 表示该配送模板全局设置所对应的区域ID。
     */
    areaIds: string;
    /**
     * 父级ID
     *
     * 表示该配送模板全局设置的父级ID。
     */
    parentId: string;
    /**
     * 加价费用
     *
     * 表示该配送模板全局设置的加价费用。
     */
    addFees: number;
    /**
     * 起步标准
     *
     * 表示该配送模板全局设置的起步标准，例如重量、体积等。
     */
    startStandards: number;
    /**
     * 是否为默认
     *
     * 表示该配送模板全局设置是否为默认设置。
     */
    defaultStatus: number;
    /**
     * 区域名称
     *
     * 表示该配送模板全局设置所对应的区域名称。
     */
    areaNames: string;
}
