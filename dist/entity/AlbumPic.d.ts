import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 相册图片实体类
 * 继承自BaseModel，包含相册图片相关的各种信息
 */
export declare class AlbumPic extends BaseModel {
    /**
     * 相册ID
     * 对应所属相册的唯一标识
     */
    albumId: string;
    /**
     * 图片URL
     * 对应相册图片的URL地址
     */
    pic: string;
}
