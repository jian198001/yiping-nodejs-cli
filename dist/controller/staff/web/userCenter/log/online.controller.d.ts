import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
/**
 * 员工Web用户中心在线日志控制器
 * 处理与在线日志相关的HTTP请求，如分页查询、根据ID查询、删除
 */
export declare class StaffWebUserCenterLogAccessLogController {
    private ctx;
    private logger;
    /**
     * 分页查询在线日志
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询在线日志
     * @param id - 在线日志ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除在线日志
     * @param ids - 在线日志ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
}
