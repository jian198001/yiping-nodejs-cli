import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
/**
 * 员工Web用户中心操作日志控制器
 * 处理与操作日志相关的HTTP请求，如分页查询、根据ID查询、删除
 */
export declare class StaffWebUserCenterLogOperationLogController {
    private ctx;
    private logger;
    private operationLogService;
    /**
     * 分页查询操作日志
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询操作日志
     * @param id - 操作日志ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除操作日志
     * @param ids - 操作日志ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
}
