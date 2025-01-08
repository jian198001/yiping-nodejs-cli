import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Stock } from '../../entity/Stock';
/**
 * 库存服务类
 * 提供库存的分页查询、根据ID查询、删除、更新、增加库存等功能
 */
export declare class StockService extends BaseService {
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
    /**
     * 根据ID查询库存
     * @param id - 库存ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除库存
     * @param ids - 库存ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新库存
     * @param obj - 库存对象
     * @returns 更新后的库存对象
     */
    update(obj: Stock): Promise<Stock>;
    /**
     * 增加库存
     * @param obj - 库存对象
     * @returns 增加后的库存对象
     */
    add(obj: Stock): Promise<Stock>;
}
