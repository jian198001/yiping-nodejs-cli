/**
 * 买家用户中心用户控制器
 */
export declare class BuyerUniUserCenterUserController {
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
     * 获取用户二维码
     *
     * @param shopId - 店铺ID
     * @returns 返回二维码信息
     */
    qrcode(shopId: any): Promise<any>;
    /**
     * 根据Token获取用户信息
     *
     * @returns 返回用户信息
     */
    getByToken(): Promise<any>;
    /**
     * 根据ID获取用户信息
     *
     * @param id - 用户ID
     * @returns 返回用户信息
     */
    getById(id: any): Promise<any>;
    /**
     * 更新用户场景
     *
     * @param scene - 场景信息
     * @returns 返回更新结果
     */
    updateScene(scene: any): Promise<any>;
    /**
     * 根据用户名查找用户
     *
     * @param username - 用户名
     * @param shopId - 店铺ID
     * @returns 返回用户信息
     */
    findByUsername(username: any, shopId: any): Promise<any>;
}
