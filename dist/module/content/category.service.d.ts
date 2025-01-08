import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Category } from '../../entity/Category';
/**
 * 分类服务类
 * 提供分类的增删改查以及分页查询功能
 */
export declare class CategoryService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询分类
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询分类
     * @param id - 分类ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除分类
     * @param ids - 分类ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新分类
     * @param obj - 分类对象
     * @returns 更新后的分类对象
     */
    update(obj: Category): Promise<Category>;
}
