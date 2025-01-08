import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品规格值实体类
 * 继承自BaseModel，用于存储商品规格值的信息
 */
export declare class SkuValue extends BaseModel {
    /**
     * 预览图片链接
     * 对应商品规格值的预览图片链接，用于在前端页面中显示规格的预览图片
     */
    previewImgUrl: string;
    /**
     * 规格图片链接
     * 对应商品规格值的图片链接，只有第一个规格类目可以定义图片，用于在前端页面中显示规格的详细图片
     */
    imgUrl: string;
    /**
     * 规格名ID
     * 对应商品规格值所属的规格名的唯一标识，用于关联规格名和规格值
     */
    skuKeyId: string;
}
