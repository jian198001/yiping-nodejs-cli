import { BaseModel } from './BaseModel';
/**
 * 人类模型类，继承自基础模型类
 */
export declare class Human extends BaseModel {
    /**
     * 性别，可为空，1表示男性，2表示女性
     */
    gender: string;
    /**
     * 出生日期，可为空
     */
    birthDate: Date;
}
