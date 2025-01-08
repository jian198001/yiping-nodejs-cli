import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商品留言实体类，继承自 BaseModel
 */
export declare class GoodsMessage extends BaseModel {
    /**
     * 留言类型为 text 时，是否多行文本。'1' 表示多行
     */
    multiple: string;
    /**
     * 留言类型为 time 时，是否含日期。'1' 表示包含
     */
    datetime: string;
    /**
     * 是否必填 '1' 表示必填
     */
    placeholder: string;
    /**
     * 留言类型，可选: id_no（身份证）, text, tel, date, time, email
     */
    type: string;
    /**
     * 是否必填 '1' 表示必填
     */
    required: string;
    /**
     * 商品ID
     */
    goodsId: string;
}
