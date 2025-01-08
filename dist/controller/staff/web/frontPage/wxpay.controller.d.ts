/**
 * 员工Web前端页面微信支付控制器
 * 处理与微信支付相关的HTTP请求，如支付通知和批量转账
 */
export declare class StaffWebFrontPageWxpayController {
    private tradeOrderService;
    private buyerService;
    /**
     * 处理微信支付通知的请求
     * @param data - 包含支付通知数据的对象
     * @param shopId - 店铺ID
     * @returns 返回支付通知处理结果
     */
    paymentNotice(data: any, shopId: string): Promise<string>;
    /**
     * 处理批量转账的请求
     * @returns 返回批量转账处理结果
     */
    batchesTransfer(): Promise<string>;
}
