import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 分账实体类
 * 用于表示分账的基本信息
 */
export declare class ProfitSharing extends BaseModel {
    /**
     * 分账金额（元）
     * 分账的金额，单位为元，标识符名称来自微信支付商户平台
     */
    amount: number;
    /**
     * 分账描述
     * 对分账的描述信息，标识符名称来自微信支付商户平台
     */
    description: string;
    /**
     * 分账接收方账号
     * 接收分账的账号，标识符名称来自微信支付商户平台
     */
    account: string;
}
