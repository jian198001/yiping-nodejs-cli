import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
/**
 * 员工用户中心库存控制器
 */
export declare class StaffWebUserCenterStockStockController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入库存服务
     */
    private stockService;
    /**
     * 获取库存分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取库存信息
     *
     * @param id - 库存ID
     * @returns 返回库存信息
     */
    getById(id: string): Promise<any>;
}
