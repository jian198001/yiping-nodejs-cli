import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
/**
 * 员工Web用户中心库存入库单控制器
 * 处理与库存入库单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterInventoryInbillController {
    private ctx;
    private logger;
    private purchaseOrderService;
    private inbillService;
    /**
     * 分页查询库存入库单
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询库存入库单
     * @param id - 库存入库单ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除库存入库单
     * @param ids - 库存入库单ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 采购入库
     * @param data - 采购入库数据
     * @returns 返回采购入库结果
     */
    purchaseInstock(data: any): Promise<any>;
    /**
     * 消费入库
     * @param data - 消费入库数据
     * @returns 返回消费入库结果
     */
    consumeInstock(data: any): Promise<any>;
}
