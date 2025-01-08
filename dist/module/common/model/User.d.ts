import { BaseModel } from './BaseModel';
/**
 * 用户模型类，继承自基础模型类
 */
export declare class User extends BaseModel {
    /**
     * 用户名，可为空
     */
    username: string;
    /**
     * 密码，可为空
     */
    password: string;
}
