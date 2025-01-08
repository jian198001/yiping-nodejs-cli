import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Post } from '../../../../../entity/Post';
/**
 * 员工Web用户中心OA岗位控制器
 * 处理与岗位相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterDeptPostController {
    private ctx;
    private logger;
    private postService;
    /**
     * 分页查询岗位
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询岗位
     * @param id - 岗位ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除岗位
     * @param ids - 岗位ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新岗位
     * @param obj - 岗位对象
     * @returns 返回更新结果
     */
    update(obj: Post): Promise<any>;
}
