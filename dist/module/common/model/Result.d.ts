/**
 * 结果模型类，用于封装API返回的数据
 */
export declare class Result {
    /**
     * 响应状态码，默认为0
     */
    code: number;
    /**
     * 响应消息，默认为空字符串
     */
    message: string;
    /**
     * 响应数据，默认为null
     */
    data: any;
    /**
     * 响应消息，默认为空字符串
     */
    msg: string;
}
