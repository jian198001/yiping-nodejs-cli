import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 折扣卡实体类
 *
 * 该类用于定义折扣卡的基本信息，包括折扣额度。
 * 所有标识符名称均来自微信支付平台。
 */
export declare class DiscountCard extends BaseModel {
    /**
     * 折扣券专用，表示打折额度（百分比）
     *
     * 例如，填30就是七折。
     */
    discount: number;
}