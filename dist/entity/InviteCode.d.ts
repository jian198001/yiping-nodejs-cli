import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 邀请码实体类
 * 用于表示邀请码的基本信息
 */
export declare class InviteCode extends BaseModel {
    /**
     * 邀请码类型
     * 邀请码的类型，1 - 渠道邀请，2 - 渠道裂变，3 - 会员邀请
     */
    codeType: string;
    /**
     * 邀请码
     * 邀请码的具体内容
     */
    inviteCode: string;
    /**
     * 主动邀请的买家ID
     * 主动发起邀请的买家的唯一标识
     */
    shopBuyerId: string;
}
