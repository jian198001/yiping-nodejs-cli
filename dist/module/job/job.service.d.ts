import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Job } from '../../entity/Job';
/**
 * 作业服务类
 * 提供作业的增删改查功能
 */
export declare class JobService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询作业
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询作业
     * @param id - 作业ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除作业
     * @param ids - 作业ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新作业
     * @param obj - 作业对象
     * @returns 更新后的作业对象
     */
    update(obj: Job): Promise<Job>;
}
