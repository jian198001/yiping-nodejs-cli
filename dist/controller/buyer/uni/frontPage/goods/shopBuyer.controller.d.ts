/**
 * 买家前端页面店铺买家控制器
 */
export declare class BuyerUniFrontPageGoodsShopBuyerController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入店铺买家服务
     */
    private shopBuyerService;
    /**
     * 根据店铺买家ID获取店铺买家信息
     *
     * @param id - 店铺买家ID
     * @returns 返回店铺买家信息
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据店铺买家编码获取店铺买家信息
     *
     * @param code - 店铺买家编码
     * @returns 返回店铺买家信息
     */
    getByCode(code?: string): Promise<any>;
}
