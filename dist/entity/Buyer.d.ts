import { User } from "../module/common/model/User";
/**
 * 买家实体类
 * 继承自User，包含买家相关的各种信息
 */
export declare class Buyer extends User {
    /**
     * 出生日期
     * 对应买家的出生日期
     */
    birthDate: any;
    /**
     * 性别
     * 对应买家的性别
     */
    gender: string;
    /**
     * 昵称
     * 对应买家的昵称
     */
    nickname: string;
}
