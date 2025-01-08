import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 多部分文件实体类
 * 用于表示多部分文件的基本信息
 */
export declare class MultipartFile extends BaseModel {
    /**
     * 文件大小
     * 多部分文件的大小，单位为字节
     */
    size: number;
    /**
     * 原始文件名
     * 多部分文件的原始文件名
     */
    originalFilename: string;
    /**
     * 文件URI
     * 多部分文件的URI
     */
    uri: string;
    /**
     * 外部ID
     * 多部分文件的外部ID
     */
    extId: string;
    /**
     * 外部类型
     * 多部分文件的外部类型
     */
    extType: string;
    /**
     * 封面图片
     * 多部分文件的封面图片
     */
    cover: string;
    /**
     * 内容类型
     * 多部分文件的内容类型
     */
    contentType: string;
}
