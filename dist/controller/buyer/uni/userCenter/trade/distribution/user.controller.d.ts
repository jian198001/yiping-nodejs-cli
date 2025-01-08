/**
 * 买家用户中心交易订单分销用户控制器
 */
export declare class BuyerUniUserCenterTradeOrderDistributionUserController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入店铺买家服务
     */
    private shopBuyerService;
    /**
     * 获取当前用户的父关联用户
     *
     * @returns 返回父关联用户信息
     */
    getParent(): Promise<any>;
    /**
     * 获取当前用户的子一级关联用户
     *
     * @returns 返回子一级关联用户信息
     */
    getChildren(): Promise<any>;
}
