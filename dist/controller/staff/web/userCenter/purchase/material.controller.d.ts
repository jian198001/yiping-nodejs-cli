import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Material } from '../../../../../entity/Material';
/**
 * 员工用户中心采购物料控制器
 */
export declare class StaffWebUserCenterPurchaseMaterialController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入物料服务
     */
    private materialService;
    /**
     * 获取物料分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取物料信息
     *
     * @param id - 物料ID
     * @returns 返回物料信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除物料
     *
     * @param ids - 物料ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新物料信息
     *
     * @param obj - 物料对象
     * @returns 返回更新结果
     */
    update(obj: Material): Promise<any>;
    /**
     * 上架物料
     *
     * @param id - 物料ID
     * @returns 返回上架结果
     */
    onsale(id: string): Promise<any>;
    /**
     * 下架物料
     *
     * @param id - 物料ID
     * @returns 返回下架结果
     */
    instock(id: string): Promise<any>;
}
