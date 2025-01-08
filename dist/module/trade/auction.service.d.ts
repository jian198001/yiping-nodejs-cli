import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Auction } from '../../entity/Auction';
import { LatestBid } from '../../entity/LatestBid';
/**
 * 拍卖服务类
 */
export declare class AuctionService extends BaseService {
    private logger;
    private delayInMinutes;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private auctionActivityRepository;
    private latestBidRepository;
    /**
     * 分页查询拍卖记录
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询拍卖记录
     * @param id - 拍卖记录ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除拍卖记录
     * @param ids - 拍卖记录ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新拍卖记录
     * @param obj - 拍卖记录对象
     * @returns Promise<Auction> - 返回更新后的拍卖记录对象
     */
    update(obj: Auction): Promise<Auction>;
    /**
     * 进行拍卖操作
     * @param obj - 拍卖对象
     * @returns Promise<Auction> - 返回拍卖对象
     */
    auction(obj: Auction): Promise<Auction>;
    /**
     * 进行拍卖操作
     * @param obj - 拍卖对象
     * @returns Promise<Auction> - 返回拍卖对象
     */
    buyerInquiry(obj: LatestBid): Promise<string>;
}
