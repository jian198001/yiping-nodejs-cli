import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 卡券时间限制实体类
 *
 * 该类用于定义卡券的时间限制信息，包括起始时间、结束时间、限制类型、起始小时和结束小时。
 * 所有标识符名称均来自微信支付平台。
 */
export declare class CardTimeLimit extends BaseModel {
    /**
     * 当前type类型下的起始时间（分钟）
     *
     * 表示在指定的type类型下，卡券的起始时间（分钟）。例如，如果当前结构体内填写了MONDAY，begin_hour填写10，此处填写了59，则此处表示周一 10:59可用。
     */
    beginMinute: number;
    /**
     * 当前type类型下的结束时间（分钟）
     *
     * 表示在指定的type类型下，卡券的结束时间（分钟）。例如，如果当前结构体内填写了MONDAY，begin_hour填写10，此处填写了59，则此处表示周一 10:59-00:59可用。
     */
    endMinute: number;
    /**
     * 限制类型枚举值
     *
     * 支持填入 MONDAY 周一、TUESDAY 周二、WEDNESDAY 周三、THURSDAY 周四、FRIDAY 周五、SATURDAY 周六、SUNDAY 周日。此处只控制显示，不控制实际使用逻辑，不填默认不显示。
     */
    type: string;
    /**
     * 当前type类型下的起始时间（小时）
     *
     * 表示在指定的type类型下，卡券的起始时间（小时）。例如，如果当前结构体内填写了MONDAY，此处填写了10，则此处表示周一 10:00可用。
     */
    beginHour: number;
    /**
     * 当前type类型下的结束时间（小时）
     *
     * 表示在指定的type类型下，卡券的结束时间（小时）。例如，如果当前结构体内填写了MONDAY，此处填写了20，则此处表示周一 10:00-20:00可用。
     */
    endHour: number;
}
