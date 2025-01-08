import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Job } from '../../../../../entity/Job';
/**
 * 员工Web用户中心作业控制器
 * 处理与作业相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterJobJobController {
    private ctx;
    private logger;
    private jobService;
    /**
     * 分页查询作业
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询作业
     * @param id - 作业ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除作业
     * @param ids - 作业ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新作业
     * @param obj - 作业对象
     * @returns 返回更新结果
     */
    update(obj: Job): Promise<any>;
}
