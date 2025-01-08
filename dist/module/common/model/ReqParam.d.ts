/**
 * 请求参数模型类
 */
export declare class ReqParam {
    /**
     * 过滤条件，默认为空字符串
     */
    filters: string;
    /**
     * 搜索值，默认为空字符串
     */
    searchValue: string;
    /**
     * 排序字段，默认为'order_num'
     */
    sortName: string;
    /**
     * 排序顺序，默认为'ASC'
     */
    sortOrder: string;
    /**
     * 标签值，默认为空字符串
     */
    tabVal: string;
    /**
     * 令牌，默认为空字符串
     */
    token: string;
}
