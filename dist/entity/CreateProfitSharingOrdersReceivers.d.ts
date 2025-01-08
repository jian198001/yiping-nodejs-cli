import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 分账接收方实体类
 *
 * 该类用于定义分账接收方的基本信息，包括接收方类型、账号、姓名、分账金额和分账描述。
 * 所有标识符名称均来自微信支付商户平台。
 */
export declare class CreateProfitSharingOrdersReceivers extends BaseModel {
    /**
     * 分账接收方类型
     *
     * 可选值为 'MERCHANT_ID' 或 'PERSONAL_OPENID'，默认为 'PERSONAL_OPENID'。
     */
    type: 'MERCHANT_ID' | 'PERSONAL_OPENID';
    /**
     * 分账接收方账号
     *
     * 接收方的账号，具体格式根据接收方类型而定。
     */
    account: string;
    /**
     * 分账个人接收方姓名
     *
     * 当接收方类型为 'PERSONAL_OPENID' 时，需要填写个人接收方的真实姓名。
     */
    name: string;
    /**
     * 分账金额（元）
     *
     * 需要分账的金额，单位为元。
     */
    amount: number;
    /**
     * 分账描述
     *
     * 对本次分账的描述信息。
     */
    description: string;
}