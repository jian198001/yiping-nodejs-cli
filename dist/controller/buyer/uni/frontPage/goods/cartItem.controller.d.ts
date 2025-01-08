import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { CartItem } from "../../../../../entity/CartItem";
/**
 * 买家前端页面商品购物车项控制器
 */
export declare class BuyerUniFrontPageGoodsCartItemController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入购物车项服务
     */
    private cartItemService;
    /**
     * 获取购物车项分页列表
     *
     * @param shopId - 店铺ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(shopId: any, query: any, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 获取购物车项数量
     *
     * @param shopId - 店铺ID
     * @returns 返回购物车项数量
     */
    count(shopId: any): Promise<any>;
    /**
     * 根据ID获取购物车项
     *
     * @param id - 购物车项ID
     * @returns 返回购物车项信息
     */
    getById(id: any): Promise<any>;
    /**
     * 添加购物车项
     *
     * @param cartItem - 购物车项信息
     * @returns 返回添加结果
     */
    add(cartItem?: CartItem): Promise<any>;
    /**
     * 清空购物车项
     *
     * @param shopId - 店铺ID
     * @returns 返回清空结果
     */
    clear(shopId: any): Promise<any>;
    /**
     * 更新购物车项数量
     *
     * @param id - 购物车项ID
     * @param quantity - 数量
     * @returns 返回更新结果
     */
    updateQuantity(id: string, quantity: number): Promise<any>;
    /**
     * 删除购物车项
     *
     * @param cartItems - 购物车项ID数组
     * @returns 返回删除结果
     */
    del(cartItems?: string[]): Promise<any>;
}
