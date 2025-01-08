import { BaseModel } from '../module/common/model/BaseModel';
/**
 * 操作日志实体类
 * 用于记录系统中的操作日志
 */
export declare class OperationLog extends BaseModel {
    /**
     * 操作者
     * 执行操作的用户或系统
     */
    sub: string;
    /**
     * 目标对象
     * 操作所针对的对象或资源
     */
    obj: string;
    /**
     * 动作
     * 执行的具体操作
     */
    act: string;
}
