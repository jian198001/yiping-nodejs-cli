import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Inventory } from '../../../../../entity/Inventory';
/**
 * 员工Web用户中心库存控制器
 * 处理与库存相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterInventoryInventoryController {
    private ctx;
    private logger;
    private inventoryService;
    /**
     * 分页查询库存记录
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询库存记录
     * @param id - 库存记录ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除库存记录
     * @param ids - 库存记录ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新库存记录
     * @param obj - 库存记录对象
     * @returns 返回更新结果
     */
    update(obj: Inventory): Promise<any>;
}
