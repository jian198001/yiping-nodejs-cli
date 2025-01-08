import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
/**
 * 买家前端页面商品分类控制器
 */
export declare class BuyerUniFrontPageGoodsGoodsCategoryController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入商品分类服务
     */
    private goodsCategoryService;
    /**
     * 获取商品分类分页列表
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
     * 根据ID获取商品分类
     *
     * @param id - 商品分类ID
     * @returns 返回商品分类信息
     */
    getById(id: string): Promise<any>;
    /**
     * 获取商品分类子分类列表
     *
     * @param parentId - 父分类ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @returns 返回子分类列表
     */
    arrPane(parentId: string, query: any, params: any, reqParam: ReqParam): Promise<any>;
}
