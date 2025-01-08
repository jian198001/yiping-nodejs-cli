import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Material } from '../../entity/Material';
/**
 * 物料服务类
 * 提供物料的分页查询、根据ID查询、删除、更新、上架、下架、库存统计、增加库存、减少库存等功能
 */
export declare class MaterialService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询物料
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询物料
     * @param id - 物料ID
     * @param shopBuyerId - 店铺买家ID
     * @returns 查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 根据ID数组删除物料
     * @param ids - 物料ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新物料
     * @param obj - 物料对象
     * @returns 更新后的物料对象
     */
    update(obj: Material): Promise<Material>;
    /**
     * 更新物料审批状态
     * @param id - 物料ID
     * @returns 更新后的物料对象
     */
    updateApproveStatus(id: string): Promise<object>;
    /**
     * 下架物料
     * @param materialId - 物料ID
     * @returns 无返回值
     */
    instock(materialId: string): Promise<void>;
    /**
     * 上架物料
     * @param materialId - 物料ID
     * @returns 无返回值
     */
    onsale(materialId: string): Promise<void>;
    /**
     * 物料统计
     * @param shopId - 店铺ID
     * @returns 物料数量
     */
    materialCount(shopId: string): Promise<number>;
    /**
     * 库存统计
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param skuList - SKU列表
     * @param quantity - 数量
     * @returns 无返回值
     */
    countStock(materialId: string, materialSkuId: string, skuList: string, quantity: number): Promise<void>;
    /**
     * 增加库存
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    addStock(materialId: string, materialSkuId: string, quantity: number): Promise<void>;
    /**
     * 减少库存
     * @param materialId - 物料ID
     * @param materialSkuId - 物料SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    reduceStock(materialId: string, materialSkuId: string, quantity: number): Promise<void>;
}
