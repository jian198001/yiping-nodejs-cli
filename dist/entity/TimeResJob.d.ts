import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 可预约的资源排班状态实体类
 * 继承自BaseModel，用于存储可预约资源的排班状态信息
 */
export declare class TimeResJob extends BaseModel {
    /**
     * 内容
     * 对应可预约资源排班状态的相关内容
     */
    content: string;
    /**
     * 资源ID
     * 对应可预约资源的唯一标识
     */
    timeResId: string;
    /**
     * 预约开始时间
     * 对应可预约资源的预约开始时间
     */
    timeStart: Date;
    /**
     * 预约结束时间
     * 对应可预约资源的预约结束时间
     */
    timeEnd: Date;
    /**
     * 此资源最大可预约数量
     * 对应可预约资源的最大可预约数量，默认为1
     */
    quota: number;
}
