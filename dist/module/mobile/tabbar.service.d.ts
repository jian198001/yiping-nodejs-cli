import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Tabbar } from '../../entity/Tabbar';
/**
 * 标签栏服务类
 * 提供标签栏的增删改查功能
 */
export declare class TabbarService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询标签栏
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询标签栏
     * @param id - 标签栏ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除标签栏
     * @param ids - 标签栏ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新标签栏
     * @param obj - 标签栏对象
     * @returns 更新后的标签栏对象
     */
    update(obj: Tabbar): Promise<Tabbar>;
}
