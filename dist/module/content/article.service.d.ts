import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Article } from '../../entity/Article';
/**
 * 文章服务类
 * 提供文章的增删改查以及分页查询功能
 */
export declare class ArticleService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询文章
     * @param categoryId - 分类ID
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(categoryId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询文章
     * @param id - 文章ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除文章
     * @param ids - 文章ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新文章
     * @param obj - 文章对象
     * @returns 更新后的文章对象
     */
    update(obj: Article): Promise<Article>;
}
