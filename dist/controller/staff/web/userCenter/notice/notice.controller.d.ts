import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Notice } from '../../../../../entity/Notice';
/**
 * 员工Web用户中心通知控制器
 * 处理与通知相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterNoticeNoticeController {
    private ctx;
    private logger;
    private noticeService;
    /**
     * 分页查询通知
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询通知
     * @param id - 通知ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除通知
     * @param ids - 通知ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新通知
     * @param obj - 通知对象
     * @returns 返回更新结果
     */
    update(obj: Notice): Promise<any>;
}
