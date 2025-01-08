import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { PageView } from '../../entity/PageView';
/**
 * 页面视图服务类
 * 提供页面视图的增删改查功能
 */
export declare class PageViewService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询页面视图
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询页面视图
     * @param id - 页面视图ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除页面视图
     * @param ids - 页面视图ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新页面视图
     * @param obj - 页面视图对象
     * @returns 更新后的页面视图对象
     */
    update(obj: PageView): Promise<PageView>;
}
