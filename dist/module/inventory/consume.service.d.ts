import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Consume } from '../../entity/Consume';
/**
 * 消耗服务类
 * 提供消耗记录的增删改查以及分页查询功能
 */
export declare class ConsumeService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询消耗记录
     * @param staffId - 员工ID
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(staffId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询消耗记录
     * @param id - 消耗记录ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除消耗记录
     * @param ids - 消耗记录ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新消耗记录
     * @param obj - 消耗记录对象
     * @returns 更新后的消耗记录对象
     */
    update(obj: Consume): Promise<Consume>;
}
