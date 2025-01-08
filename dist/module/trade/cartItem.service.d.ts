import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { CartItem } from '../../entity/CartItem';
export declare class CartItemService extends BaseService {
    private logger;
    static TABLE_NAME: string;
    private fromSql;
    private selectSql;
    private repository;
    private goodsService;
    private goodsMessageService;
    /**
     * 分页查询购物车项
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(shopId: string, shopBuyerId: any, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 统计购物车项数量
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<number> - 返回购物车项数量
     */
    count(shopId: string, shopBuyerId: string): Promise<number>;
    /**
     * 根据ID查询购物车项
     * @param id - 购物车项ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除购物车项
     * @param ids - 购物车项ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新购物车项
     * @param obj - 购物车项对象
     * @returns Promise<CartItem> - 返回更新后的购物车项对象
     */
    update(obj: CartItem): Promise<CartItem>;
    /**
     * 保存购物车项
     * @param map - 购物车项数据
     * @param shopBuyerId - 店铺买家ID
     * @param priceUnit - 价格单位
     * @returns Promise<void> - 无返回值
     */
    save(map: any, shopBuyerId: any, priceUnit: number): Promise<void>;
    propertiesSum(list: any[]): Promise<number>;
    propertiesPriceMul(list: any[], priceUnit: number): Promise<any[]>;
    add(cartItem: CartItem): Promise<CartItem>;
    getCartItem(cartItem: CartItem): Promise<CartItem>;
    updateQuantity(id: string, quantity: number): Promise<void>;
    clear(shopId: string, shopBuyerId: string): Promise<CartItem>;
}
