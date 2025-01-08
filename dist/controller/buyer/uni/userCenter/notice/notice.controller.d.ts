import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { Notice } from "../../../../../entity/Notice";
/**
 * 买家用户中心通知控制器
 */
export declare class BuyerUniUserCenterNoticeNoticeController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入通知服务
     */
    private noticeService;
    /**
     * 获取通知分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取通知
     *
     * @param id - 通知ID
     * @returns 返回通知信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新通知
     *
     * @param obj - 通知对象
     * @returns 返回更新结果
     */
    update(obj: Notice): Promise<any>;
}
