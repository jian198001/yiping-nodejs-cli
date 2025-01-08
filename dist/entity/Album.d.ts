import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 相册实体类
 * 继承自BaseModel，包含相册相关的各种信息
 */
export declare class Album extends BaseModel {
    /**
     * 相册描述
     */
    description: string;
    /**
     * 照片数量
     */
    picCount: number;
    /**
     * 封面图片
     */
    coverPic: string;
}
