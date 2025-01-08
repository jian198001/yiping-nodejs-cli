import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { GoodsCategory } from '../../../../../../entity/GoodsCategory';
/**
 * 员工用户中心商品分类控制器
 */
export declare class StaffWebUserCenterGoodsGoodsCategoryController {
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
    page(shopId: any, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取商品分类信息
     *
     * @param id - 商品分类ID
     * @returns 返回商品分类信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除商品分类
     *
     * @param ids - 商品分类ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新商品分类信息
     *
     * @param obj - 商品分类对象
     * @returns 返回更新结果
     */
    update(obj: GoodsCategory): Promise<any>;
    /**
     * 上传商品分类图片
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回上传结果
     */
    imgUpload(files: any, query: any): Promise<any>;
    /**
     * 删除商品分类图片
     *
     * @param id - 图片ID
     * @returns 返回删除结果
     */
    imgDel(id: any): Promise<any>;
}