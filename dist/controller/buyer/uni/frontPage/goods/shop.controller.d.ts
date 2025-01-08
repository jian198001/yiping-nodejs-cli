/**
 * 买家前端页面店铺控制器
 */
export declare class BuyerUniFrontPageGoodsShopController {
    /**
     * 注入店铺服务
     */
    private shopService;
    /**
     * 根据店铺ID获取店铺信息
     *
     * @param id - 店铺ID
     * @returns 返回店铺信息
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据店铺编码获取店铺信息
     *
     * @param code - 店铺编码
     * @returns 返回店铺信息
     */
    getByCode(code?: string): Promise<any>;
}
