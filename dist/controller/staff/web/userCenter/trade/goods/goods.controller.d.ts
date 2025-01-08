import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { Goods } from '../../../../../../entity/Goods';
/**
 * 员工用户中心商品控制器
 */
export declare class StaffWebUserCenterGoodsGoodsController {
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
     * 获取商品分页列表
     *
     * @param goodsCategoryId - 商品分类ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(goodsCategoryId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取商品信息
     *
     * @param id - 商品ID
     * @returns 返回商品信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除商品
     *
     * @param ids - 商品ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新商品信息
     *
     * @param obj - 商品对象
     * @param imgs - 商品图片
     * @returns 返回更新结果
     */
    update(obj?: Goods, imgs?: string): Promise<any>;
    /**
     * 上架商品
     *
     * @param id - 商品ID
     * @returns 返回操作结果
     */
    onsale(id: string): Promise<any>;
    /**
     * 下架商品
     *
     * @param id - 商品ID
     * @returns 返回操作结果
     */
    instock(id: string): Promise<any>;
    /**
     * 上传商品图片
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回上传结果
     */
    imgUpload(files: any, query: any): Promise<any>;
}
