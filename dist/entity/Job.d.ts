import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 任务实体类
 * 用于表示任务的基本信息
 */
export declare class Job extends BaseModel {
    /**
     * 任务处理程序名称
     * 任务处理程序的名称
     */
    handlerName: string;
    /**
     * 任务处理程序参数
     * 任务处理程序的参数
     */
    handlerParam: string;
    /**
     * cron表达式
     * 用于定时任务的cron表达式
     */
    cronExpression: string;
    /**
     * 重试次数
     * 任务执行失败后的重试次数
     */
    retryCount: number;
    /**
     * 重试间隔
     * 任务执行失败后的重试间隔时间（单位：秒）
     */
    retryInterval: number;
    /**
     * 监控超时时间
     * 任务执行的监控超时时间（单位：秒）
     */
    monitorTimeout: number;
}
