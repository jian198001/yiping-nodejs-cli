import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Tag } from '../../../../../entity/Tag';
/**
 * 员工用户中心标签控制器
 */
export declare class StaffWebUserCenterTagTagController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入标签服务
     */
    private tagService;
    /**
     * 获取标签分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取标签信息
     *
     * @param id - 标签ID
     * @returns 返回标签信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除标签
     *
     * @param ids - 标签ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新标签信息
     *
     * @param obj - 标签对象
     * @returns 返回更新结果
     */
    update(obj: Tag): Promise<any>;
}
