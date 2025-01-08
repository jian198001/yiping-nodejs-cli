import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 配送模板区域设置实体类
 *
 * 该类用于定义配送模板区域设置的基本信息，包括是否为默认、区域名称、起步标准、加价费用、区域ID、父级ID、加价标准、店铺ID、计价方式和起步费用。
 * 所有标识符名称均来自支付宝。
 */
export declare class DeliveryTemplateLocale extends BaseModel {
    /**
     * 是否为默认
     *
     * 表示该配送模板区域设置是否为默认设置。
     */
    defaultStatus: number;
    /**
     * 区域名称
     *
     * 表示该配送模板区域设置所对应的区域名称。
     */
    areaNames: string;
    /**
     * 起步标准
     *
     * 表示该配送模板区域设置的起步标准，例如重量、体积等。
     */
    startStandards: number;
    /**
     * 加价费用
     *
     * 表示该配送模板区域设置的加价费用。
     */
    addFees: number;
    /**
     * 区域ID
     *
     * 表示该配送模板区域设置所对应的区域ID。
     */
    areaIds: string;
    /**
     * 父级ID
     *
     * 表示该配送模板区域设置的父级ID。
     */
    parentId: string;
    /**
     * 加价标准
     *
     * 表示该配送模板区域设置的加价标准，例如每增加一定重量或体积的加价费用。
     */
    addStandards: number;
    /**
     * 店铺ID
     *
     * 表示该配送模板区域设置所对应的店铺ID。
     */
    shopId: string;
    /**
     * 计价方式
     *
     * 表示该配送模板区域设置的计价方式，例如按重量、体积或件数计价。
     */
    valuation: string;
    /**
     * 起步费用
     *
     * 表示该配送模板区域设置的起步费用。
     */
    startFees: number;
}
