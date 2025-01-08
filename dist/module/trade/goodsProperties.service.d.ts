import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { GoodsPropertiesKey } from "../../entity/GoodsPropertiesKey";
/**
 * 商品属性服务类
 */
export declare class GoodsPropertiesService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private goodsPropertiesValueRepository;
    private priceUnit;
    /**
     * 分页查询商品属性数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询商品属性数据
     * @param id - 商品属性ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除商品属性数据
     * @param ids - 商品属性ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新商品属性数据
     * @param obj - 商品属性对象
     * @returns 更新后的商品属性对象
     */
    update(obj: GoodsPropertiesKey): Promise<GoodsPropertiesKey>;
    /**
     * 从购物车属性中获取中文描述
     * @param properties - 购物车属性字符串
     * @returns 中文描述字符串
     */
    getCnStrFromCart(properties: string): Promise<string>;
    /**
     * 从购物车属性中获取初始SKU
     * @param properties - 购物车属性字符串
     * @returns 初始SKU对象
     */
    getInitialSkuFromCart(properties: string): Promise<object>;
    /**
     * 将字符串转换为布尔值
     * @param multiple - 字符串值
     * @returns 布尔值
     */
    toBoolean(multiple: string): Promise<boolean>;
    /**
     * 获取商品属性列表
     * @param goodsId - 商品ID
     * @returns 商品属性列表
     */
    list(goodsId: string): Promise<any[]>;
    save(map: any): Promise<void>;
}
