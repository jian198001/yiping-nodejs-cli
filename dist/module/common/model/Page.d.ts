/**
 * 分页数据模型类
 */
export declare class Page {
    /**
     * 当前页码，默认为1
     */
    pageNum: number;
    /**
     * 每页显示的记录数，默认为20
     */
    pageSize: number;
    /**
     * 当前页的起始行号，默认为0
     */
    startRow: number;
    /**
     * 总记录数，默认为0
     */
    total: number;
    /**
     * 当前页的数据列表，默认为空数组
     */
    list: any[];
}
