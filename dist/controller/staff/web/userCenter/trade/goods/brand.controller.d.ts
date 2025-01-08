import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { Brand } from '../../../../../../entity/Brand';
/**
 * 员工用户中心商品品牌控制器
 */
export declare class StaffWebUserCenterGoodsBrandController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入品牌服务
     */
    private brandService;
    /**
     * 获取品牌分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取品牌信息
     *
     * @param id - 品牌ID
     * @returns 返回品牌信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除品牌
     *
     * @param ids - 品牌ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新品牌信息
     *
     * @param obj - 品牌对象
     * @returns 返回更新结果
     */
    update(obj: Brand): Promise<any>;
}
