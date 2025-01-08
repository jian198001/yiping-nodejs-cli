import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { OperationLog } from '../../entity/OperationLog';
/**
 * 操作日志服务类
 * 提供操作日志的增删改查功能
 */
export declare class OperationLogService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询操作日志
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询操作日志
     * @param id - 操作日志ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除操作日志
     * @param ids - 操作日志ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新操作日志
     * @param obj - 操作日志对象
     * @returns 更新后的操作日志对象
     */
    update(obj: OperationLog): Promise<OperationLog>;
}
