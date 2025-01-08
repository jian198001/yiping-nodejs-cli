import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { MemberCard } from '../../entity/MemberCard';
/**
 * 会员卡订单服务类
 */
export declare class MemberCardOrderService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询会员卡订单
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询会员卡订单
     * @param id - 会员卡订单ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除会员卡订单
     * @param ids - 会员卡订单ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新会员卡订单
     * @param obj - 会员卡订单对象
     * @returns Promise<MemberCard> - 返回更新后的会员卡订单对象
     */
    update(obj: MemberCard): Promise<MemberCard>;
    /**
     * 购买会员卡
     * @returns Promise<void> - 无返回值
     */
    buy(): Promise<void>;
    /**
     * 保存会员卡优惠
     * @returns Promise<void> - 无返回值
     */
    saveMemberCardOffer(): Promise<void>;
    /**
     * 创建会员卡优惠
     * @returns Promise<void> - 无返回值
     */
    createMemberCardOffers(): Promise<void>;
    /**
     * 购买商城会员卡
     * @returns Promise<void> - 无返回值
     */
    buyMallMemberCard(): Promise<void>;
    /**
     * 更新店铺结束时间
     * @returns Promise<void> - 无返回值
     */
    updateShopEndTime(): Promise<void>;
}
