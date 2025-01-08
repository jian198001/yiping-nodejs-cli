import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { TimeResJobWork } from '../../../../../entity/TimeResJobWork';
/**
 * 买家用户中心工作时间管理控制器
 */
export declare class BuyerUniUserCenterTimeResTimeResJobWorkController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入工作时间管理服务
     */
    private timeResJobWorkService;
    /**
     * 获取工作时间分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取工作时间信息
     *
     * @param id - 工作时间ID
     * @returns 返回工作时间信息
     */
    getById(id: string): Promise<any>;
    /**
     * 预约工作时间
     *
     * @param obj - 工作时间对象
     * @returns 返回预约结果
     */
    work(obj: TimeResJobWork): Promise<any>;
}
