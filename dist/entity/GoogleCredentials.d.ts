import { BaseModel } from "../module/common/model/BaseModel";
/**
 * Google凭证实体类
 * 用于表示Google凭证的基本信息
 */
export declare class GoogleCredentials extends BaseModel {
    /**
     * 账户名称
     * Google凭证的账户名称
     */
    accountName: string;
    /**
     * 显示名称
     * Google凭证的显示名称
     */
    displayName: string;
    /**
     * 邮箱
     * Google凭证的邮箱
     */
    email: string;
    /**
     * 姓氏
     * Google凭证的姓氏
     */
    familyName: string;
    /**
     * 名字
     * Google凭证的名字
     */
    givenName: string;
    /**
     * Google ID
     * Google凭证的Google ID
     */
    googleId: string;
    /**
     * 照片URL
     * Google凭证的照片URL
     */
    photoUrl: string;
}
