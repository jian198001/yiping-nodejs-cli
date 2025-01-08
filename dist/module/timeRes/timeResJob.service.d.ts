import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { TimeResJob } from "../../entity/TimeResJob";
import { ShopBuyer } from "../../entity/ShopBuyer";
/**
 * 时间资源任务服务类
 * 提供时间资源任务的分页查询、根据ID查询、删除、更新等功能
 */
export declare class TimeResJobService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private timeJobRepository;
    private shopBuyerRepository;
    private shopBuyerService;
    /**
     * 分页查询时间资源任务
     * @param sellerId - 预约信息发布者id
     * @param user - 用户类型
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(sellerId: string, // 预约信息发布者id,发布者只能看到自己发布的信息,消费者只能看到指定发布者发布的信息
    user: string, // 用户类型，买家只可以看到可预约的时间段，无法看到已过期的时间段，卖家(排班生产者)可以看到全部时间段
    query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询时间资源任务
     * @param id - 时间资源任务ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除时间资源任务
     * @param ids - 时间资源任务ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新时间资源任务
     * @param obj - 时间资源任务对象
     * @param timeStartStr - 开始时间字符串
     * @param timeEndStr - 结束时间字符串
     * @param day - 日期字符串
     * @param userId - 用户ID
     * @returns 更新后的时间资源任务
     */
    update(obj: TimeResJob, timeStartStr?: string, timeEndStr?: string, day?: string, userId?: string): Promise<TimeResJob>;
    updateScene(username: string, shopBuyerId: string): Promise<ShopBuyer>;
}
