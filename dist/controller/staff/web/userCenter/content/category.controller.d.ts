import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Category } from '../../../../../entity/Category';
/**
 * 员工Web用户中心内容分类控制器
 * 处理与分类相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterContentCategoryController {
    private ctx;
    private logger;
    private categoryService;
    /**
     * 分页查询分类
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询分类
     * @param id - 分类ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除分类
     * @param ids - 分类ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新分类
     * @param obj - 分类对象
     * @returns 返回更新结果
     */
    update(obj: Category): Promise<any>;
}
