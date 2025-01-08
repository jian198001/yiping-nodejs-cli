import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { GoodsProps } from "../../entity/GoodsProps";
/**
 * 商品属性服务类
 */
export declare class GoodsPropsService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询商品属性数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
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
    update(obj: GoodsProps): Promise<GoodsProps>;
    /**
     * 获取商品属性
     * @param goodsId - 商品ID
     * @returns 商品属性数组
     */
    getProps(goodsId: string): Promise<any[]>;
    /**
     * 保存商品属性
     * @param goodsProps - 商品属性对象
     * @returns 无返回值
     */
    saveGoodsProps(goodsProps: GoodsProps): Promise<void>;
}
