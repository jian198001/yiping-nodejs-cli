import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品属性实体类
 * 用于表示商品的属性信息
 */
export declare class GoodsProps extends BaseModel {
    /**
     * 商品ID
     * 关联的商品的唯一标识
     */
    goodsId: string;
    /**
     * 属性类型
     * 商品属性的类型，可选值包括：id_no（身份证）、text、tel、date、time、email等
     */
    type: string;
    /**
     * 属性值
     * 商品属性的具体值
     */
    value: string;
    /**
     * 属性名称
     * 商品属性的名称
     */
    name: string;
    /**
     * 属性标签
     * 商品属性的标签，用于展示或分类
     */
    label: string;
    /**
     * 是否必填
     * 商品属性是否必填，1表示是，0表示否
     */
    required: string;
    /**
     * 默认值
     * 商品属性的默认值
     */
    defaultValue: string;
}
