import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { TimeResJobWork } from '../../entity/TimeResJobWork';
/**
 * 时间资源工作服务类
 * 提供时间资源工作的分页查询、根据ID查询、删除、预约等功能
 */
export declare class TimeResJobWorkService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private timeResJobService;
    /**
     * 分页查询时间资源工作
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询时间资源工作
     * @param id - 时间资源工作ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除时间资源工作
     * @param ids - 时间资源工作ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 预约时间资源工作
     * @param obj - 时间资源工作对象
     * @returns 预约后的时间资源工作对象
     */
    work(obj: TimeResJobWork): Promise<TimeResJobWork>;
}
