import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Article } from '../../../../../entity/Article';
/**
 * 员工Web用户中心内容文章控制器
 * 处理与文章相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterContentArticleController {
    private ctx;
    private logger;
    private articleService;
    /**
     * 分页查询文章
     * @param categoryId - 文章分类ID
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(categoryId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询文章
     * @param id - 文章ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除文章
     * @param ids - 文章ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新文章
     * @param obj - 文章对象
     * @returns 返回更新结果
     */
    update(obj: Article): Promise<any>;
}
