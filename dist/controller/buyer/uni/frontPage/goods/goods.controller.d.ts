import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { Favor } from "../../../../../entity/Favor";
/**
 * 买家前端页面商品控制器
 */
export declare class BuyerUniFrontPageGoodsGoodsController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入商品服务
     */
    private goodsService;
    /**
     * 注入收藏服务
     */
    private favorService;
    /**
     * 获取商品分页列表
     *
     * @param goodsCategoryId - 商品分类ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(goodsCategoryId: string, query: any, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取商品
     *
     * @param id - 商品ID
     * @returns 返回商品信息
     */
    getById(id: string): Promise<any>;
    /**
     * 收藏商品
     *
     * @param favor - 收藏信息
     * @returns 返回收藏结果
     */
    favor(favor: Favor): Promise<any>;
}
