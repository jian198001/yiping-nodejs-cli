import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Outbill } from '../../../../../entity/Outbill';
/**
 * 员工Web用户中心库存出库单控制器
 * 处理与库存出库单相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterInventoryOutbillController {
    private ctx;
    private logger;
    private outbillService;
    /**
     * 分页查询库存出库单
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询库存出库单
     * @param id - 库存出库单ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除库存出库单
     * @param ids - 库存出库单ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新库存出库单
     * @param obj - 库存出库单对象
     * @returns 返回更新结果
     */
    update(obj: Outbill): Promise<any>;
    /**
     * 消费出库
     * @param data - 消费出库数据
     * @returns 返回消费出库结果
     */
    consumeOutstock(data: any): Promise<any>;
}
