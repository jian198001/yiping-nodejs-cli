import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 评价实体类
 *
 * 该类用于定义用户对订单的评价信息，包括评价内容、评价结果、订单ID、是否匿名和买家ID。
 * 所有标识符名称均来自淘宝开放平台。
 */
export declare class Comment extends BaseModel {
    /**
     * 评价内容
     *
     * 评价的具体内容，最大长度为500个汉字。当评价结果为good时，评价内容可为空；当评价结果为neutral或bad时，评价内容必填。
     */
    content: string;
    /**
     * 评价结果
     *
     * 评价的结果，可选值为good（好评）、neutral（中评）或bad（差评）。
     */
    result: string;
    /**
     * 订单ID
     *
     * 被评价订单的唯一标识符。
     */
    orderId: string;
    /**
     * 是否匿名
     *
     * 评价是否匿名，卖家评不能匿名。可选值为1（匿名）或0（非匿名）。如果交易订单匿名，则评价也匿名。
     */
    anony: string;
    /**
     * 买家ID
     *
     * 评价买家的唯一标识符。
     */
    shopBuyerId: string;
}
