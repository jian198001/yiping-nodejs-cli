import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { TimeResJob } from "../../../../../entity/TimeResJob";
/**
 * 买家用户中心可预约时间段管理控制器
 */
export declare class BuyerUniUserCenterTimeResTimeResJobController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入可预约时间段管理服务
     */
    private timeResJobService;
    /**
     * 获取可预约时间段分页列表
     *
     * @param user - 用户信息
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(user: any, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取可预约时间段信息
     *
     * @param id - 可预约时间段ID
     * @returns 返回可预约时间段信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新可预约时间段信息
     *
     * @param obj - 可预约时间段对象
     * @param timestartStr - 开始时间字符串
     * @param timeEndStr - 结束时间字符串
     * @param day - 日期
     * @returns 返回更新结果
     */
    update(obj: TimeResJob, timestartStr: string, timeEndStr: string, day: string): Promise<any>;
    /**
     * 更新场景信息
     *
     * @param username - 用户名
     * @returns 返回更新结果
     */
    updateScene(username: string): Promise<any>;
}
