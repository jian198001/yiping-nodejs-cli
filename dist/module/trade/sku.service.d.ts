import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { SkuKey } from "../../entity/SkuKey";
export declare class SkuService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private skuListRepository;
    /**
     * 分页查询商品规格数据
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页参数
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询一条商品规格数据
     * @param id - 商品规格ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据商品规格ID删除商品规格信息
     * @param ids - 商品规格ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新或插入SKU规格信息
     * @param obj - 包含SKU规格信息的对象
     * @returns Promise<SkuKey> - 返回更新后的SKU规格信息对象
     */
    update(obj: SkuKey): Promise<SkuKey>;
    /**
     * 将JSON字符串转换为中文格式的字符串
     * @param jsonStr - 输入的JSON字符串
     * @returns Promise<string> - 返回转换后的中文格式字符串
     */
    json2CnStr(jsonStr: string): Promise<string>;
    /**
     * 提取购买信息中的SKU规格信息
     * @param jsonArray - 包含购买信息的JSON数组
     * @returns Promise<any[]> - 返回提取出的SKU规格信息数组
     */
    changeSkuList(jsonArray: any[]): Promise<any[]>;
    /**
     * 根据id查询一条商品规格数据
     * @param id - 商品规格ID
     * @returns Promise<void> - 无返回值
     */
    selectById(id: string): Promise<void>;
    /**
     * 取得商品规格的有效价格库存信息（库存需大于0）
     * @param goodsId - 商品ID
     * @param skuPriceUnit - 商品规格的价格单位
     * @param shopBuyerId - 买家ID（可选）
     * @returns Promise<void> - 无返回值
     */
    getValidSkuList(goodsId: string, skuPriceUnit: number, shopBuyerId?: string): Promise<void>;
    getInitialSku(jsonArray: any[], goodsId: string, shopBuyerId?: string): Promise<void>;
    /**
     * 更新商品规格的有效价格库存信息（库存需大于0）中的默认选中的库存
     * @param goodsId - 商品ID
     * @param initialSkuListMap - 包含默认选中库存的商品规格信息映射
     * @returns Promise<void> - 无返回值
     */
    updateGoodsInitialSku(goodsId: string, initialSkuListMap: any): Promise<void>;
    /**
     * 取得商品规格的价格库存信息
     * @param goodsId - 商品ID
     * @param skuPriceUnit - 商品规格的价格单位
     * @param isUpdate - 是否更新商品规格的价格库存信息
     * @returns Promise<void> - 无返回值
     */
    getSkuList(goodsId: string, skuPriceUnit: number, isUpdate: boolean): Promise<void>;
    /**
     * 保存商品规格的价格库存信息
     * @param skuList - 商品规格的价格库存信息
     * @returns Promise<void> - 无返回值
     */
    saveSkuList(skuList: string): Promise<void>;
    /**
     * 根据商品规格ID、商品ID和商品规格列表获取商品规格的中文名称
     * @param skuListId - 商品规格ID
     * @param goodsId - 商品ID
     * @param skuList - 商品规格列表
     * @returns Promise<any> - 返回商品规格的中文名称
     */
    getSkuListCn(skuListId: string, goodsId: string, skuList: any): Promise<any>;
    /**
     * 减少商品规格的库存数量
     * @param id - 商品规格ID
     * @param subStock - 要减少的库存数量
     * @returns Promise<void> - 无返回值
     */
    subStock(id: string, subStock: number): Promise<void>;
    /**
     * 增加商品规格的库存数量
     * @param id - 商品规格ID
     * @param subStock - 要增加的库存数量
     * @returns Promise<void> - 无返回值
     */
    refundStock(id: string, subStock: number): Promise<void>;
}
