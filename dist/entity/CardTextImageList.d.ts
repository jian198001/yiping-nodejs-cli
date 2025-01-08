import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 卡券图文列表实体类
 * 继承自BaseModel，包含卡券图文相关的各种信息
 */
export declare class CardTextImageList extends BaseModel {
    /**
     * 图片链接
     * 对应卡券图文的图片链接，必须调用上传图片接口上传图片获得链接，并在此填入，否则报错
     */
    imageUrl: string;
    /**
     * 图文描述
     * 对应卡券图文的文字描述
     */
    text: string;
}
