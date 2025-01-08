import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { AuctionActivity } from '../../entity/AuctionActivity';
/**
 * 拍卖活动服务类
 */
export declare class AuctionActivityService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询拍卖活动
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询拍卖活动
     * @param id - 拍卖活动ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除拍卖活动
     * @param ids - 拍卖活动ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新拍卖活动
     * @param obj - 拍卖活动对象
     * @returns Promise<AuctionActivity> - 返回更新后的拍卖活动对象
     */
    update(obj: AuctionActivity): Promise<AuctionActivity>;
}
