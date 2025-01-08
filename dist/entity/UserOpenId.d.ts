import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 用户OpenID实体类
 * 继承自BaseModel，包含用户OpenID相关的各种信息
 */
export declare class UserOpenId extends BaseModel {
    /**
     * 应用ID
     * 对应微信公众号或小程序的应用ID
     */
    appId: string;
    /**
     * 用户OpenID
     * 对应微信用户的唯一标识
     */
    openId: string;
    /**
     * 用户角色
     * 对应用户的角色
     */
    userRole: string;
    /**
     * 命名空间
     * 对应用户OpenID的命名空间
     */
    namespace: string;
    /**
     * 用户ID
     * 对应用户的唯一标识
     */
    userId: string;
}
