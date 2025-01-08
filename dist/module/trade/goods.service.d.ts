import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Goods } from "../../entity/Goods";
import { MultipartFile } from "../../entity/MultipartFile";
/**
 * 商品服务类
 */
export declare class GoodsService extends BaseService {
    private logger;
    private domain;
    private app;
    static emptyGoodsImg: string;
    static TABLE_NAME: string;
    private fromSql;
    private selectSql;
    private repository;
    private shopService;
    private multipartFileRepository;
    /**
     * 分页查询商品数据
     * @param goodsCategoryId - 商品分类ID
     * @param approveStatus - 商品审核状态
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(goodsCategoryId: string, approveStatus: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询商品数据
     * @param id - 商品ID
     * @param shopBuyerId - 店铺买家ID
     * @returns 查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除商品数据
     * @param ids - 商品ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新商品数据
     * @param obj - 商品对象
     * @param imgs - 商品图片
     * @returns 更新后的商品对象
     */
    update(obj: Goods, imgs?: string): Promise<Goods>;
    /**
     * 更新审批状态
     * @param id - 商品ID
     * @returns 更新后的商品对象
     */
    updateApproveStatus(id: string): Promise<object>;
    /**
     * 商品下架
     * @param goodsId - 商品ID
     * @returns 无返回值
     */
    instock(goodsId: string): Promise<void>;
    /**
     * 商品上架
     * @param goodsId - 商品ID
     * @returns 无返回值
     */
    onsale(goodsId: string): Promise<void>;
    /**
     * 商品数量
     * @param shopId - 店铺ID
     * @returns 商品数量
     */
    goodsCount(shopId: string): Promise<number>;
    /**
     * 库存变更
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param skuList - SKU列表
     * @param quantity - 数量
     * @returns 无返回值
     */
    countStock(goodsId: string, goodsSkuId: string, skuList: string, quantity: number): Promise<void>;
    /**
     * 增加库存
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    addStock(goodsId: string, goodsSkuId: string, quantity: number): Promise<void>;
    /**
     * 减少库存
     * @param goodsId - 商品ID
     * @param goodsSkuId - 商品SKU ID
     * @param quantity - 数量
     * @returns 无返回值
     */
    reduceStock(goodsId: string, goodsSkuId: string, quantity: number): Promise<void>;
    private imgUpdate;
    imgUpload(files: any[], query: any): Promise<MultipartFile>;
}
