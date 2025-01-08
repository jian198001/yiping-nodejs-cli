import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { GoodsCategory } from "../../entity/GoodsCategory";
import { MultipartFile } from "../../entity/MultipartFile";
/**
 * 商品分类服务类
 */
export declare class GoodsCategoryService extends BaseService {
    private logger;
    private app;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private multipartFileRepository;
    /**
     * 分页查询商品分类数据
     * @param shopId - 店铺ID
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(shopId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询商品分类数据
     * @param id - 商品分类ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 获取商品分类的子分类
     * @param parentId - 父级分类ID
     * @param reqParam - 请求参数对象
     * @returns 商品分类的子分类数组
     */
    arrPane(parentId: string, reqParam: ReqParam): Promise<any[]>;
    /**
     * 删除商品分类数据
     * @param ids - 商品分类ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新商品分类数据
     * @param obj - 商品分类对象
     * @returns 更新后的商品分类对象
     */
    update(obj: GoodsCategory): Promise<GoodsCategory>;
    private updateCode;
    imgUpload(files: any[], query: any): Promise<MultipartFile>;
    imgDel(id: string): Promise<void>;
    /**
     * getMaxCodeLength
     */
    getMaxCodeLength(): Promise<number>;
}
