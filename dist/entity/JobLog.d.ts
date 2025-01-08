import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 任务日志实体类
 * 用于记录任务执行的日志信息
 */
export declare class JobLog extends BaseModel {
    /**
     * 任务ID
     * 关联的任务的唯一标识
     */
    jobId: string;
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
     * 执行索引
     * 任务执行的索引
     */
    executeIndex: string;
    /**
     * 开始时间
     * 任务执行的开始时间
     */
    beginTime: string;
    /**
     * 结束时间
     * 任务执行的结束时间
     */
    endTime: string;
    /**
     * 执行状态
     * 任务执行的状态
     */
    executeStatus: string;
    /**
     * 执行时间
     * 任务执行的时间
     */
    executeTime: string;
    /**
     * 执行结果
     * 任务执行的结果
     */
    executeResult: string;
    /**
     * 错误信息
     * 任务执行失败时的错误信息
     */
    errorMessage: string;
    /**
     * 错误堆栈
     * 任务执行失败时的错误堆栈信息
     */
    errorStack: string;
}
