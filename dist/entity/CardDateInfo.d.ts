import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 卡券日期信息实体类
 * 继承自BaseModel，包含卡券的日期相关信息
 */
export declare class CardDateInfo extends BaseModel {
    /**
     * 起用时间
     * type为DATE_TYPE_FIX_TIME_RANGE时专用，表示卡券的起用时间，从1970年1月1日00:00:00至起用时间的秒数，最终需转换为字符串形态传入（东八区时间，UTC+8，单位为秒）
     */
    beginTimestamp: number;
    /**
     * 日期类型
     * 卡券的日期类型，可选值为DATE_TYPE_PERMANENT（永久有效）、DATE_TYPE_FIX_TIME_RANGE（固定日期区间）或DATE_TYPE_FIX_TERM（固定时长，自领取后按天算），默认为DATE_TYPE_PERMANENT
     */
    type: string;
    /**
     * 自领取后多少天开始生效
     * type为DATE_TYPE_FIX_TERM时专用，表示卡券自领取后多少天开始生效，领取后当天生效填写0（单位为天）
     */
    fixedTerm: number;
    /**
     * 结束时间
     * 卡券的结束时间，建议设置为截止日期的23:59:59过期（东八区时间，UTC+8，单位为秒），可用于DATE_TYPE_FIX_TERM时间类型，表示卡券统一过期时间，设置了fixed_term卡券，当时间达到end_timestamp时卡券统一过期
     */
    endTimestamp: number;
    /**
     * 自领取后多少天内有效
     * type为DATE_TYPE_FIX_TERM时专用，表示卡券自领取后多少天内有效，不支持填写0
     */
    fixedBeginTerm: number;
}
