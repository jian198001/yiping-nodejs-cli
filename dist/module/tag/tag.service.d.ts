import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Tag } from '../../entity/Tag';
/**
 * 标签服务类
 * 提供标签的分页查询、根据ID查询、删除、更新、添加等功能
 */
export declare class TagService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询标签
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询标签
     * @param id - 标签ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除标签
     * @param ids - 标签ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新标签
     * @param obj - 标签对象
     * @returns 更新后的标签对象
     */
    update(obj: Tag): Promise<Tag>;
    /**
     * 添加标签
     * @param obj - 标签对象
     * @returns 添加后的标签对象
     */
    add(obj: Tag): Promise<Tag>;
}
