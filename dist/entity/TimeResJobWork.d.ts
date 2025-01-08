import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 可预约的资源排班工作实体类
 * 继承自BaseModel，用于存储可预约资源排班工作的相关信息
 */
export declare class TimeResJobWork extends BaseModel {
    /**
     * 资源排班ID
     * 对应可预约资源排班的唯一标识
     */
    timeResJobId: string;
    /**
     * 预约用户id
     * 对应预约用户的唯一标识
     */
    userId: string;
    /**
     * 预约用户留言
     * 对应预约用户的留言信息
     */
    message: string;
}
