import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Inventory } from '../../entity/Inventory';
/**
 * 库存服务类
 * 提供库存的增删改查功能
 */
export declare class InventoryService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询库存
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询库存
     * @param id - 库存ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除库存
     * @param ids - 库存ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新库存
     * @param obj - 库存对象
     * @returns 更新后的库存对象
     */
    update(obj: Inventory): Promise<Inventory>;
}
