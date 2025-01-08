import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { MemberCardOffer } from '../../entity/MemberCardOffer';
import { MemberCardOfferConsume } from '../../entity/MemberCardOfferConsume';
/**
 * 会员卡服务类
 */
export declare class MemberCardOfferService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private memberCardOfferConsumeRepository;
    /**
     * 分页查询会员卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询会员卡数据
     * @param id - 会员卡ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除会员卡数据
     * @param ids - 会员卡ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新会员卡数据
     * @param obj - 会员卡对象
     * @returns 更新后的会员卡对象
     */
    update(obj: MemberCardOffer): Promise<MemberCardOffer>;
    /**
     * 会员卡消费
     * @param memberCardOfferConsume - 会员卡消费对象
     * @returns 会员卡消费对象
     */
    consume(memberCardOfferConsume: MemberCardOfferConsume): Promise<MemberCardOfferConsume>;
    activate(memberCardOfferId: string): Promise<MemberCardOffer>;
    init(memberCardOffer: MemberCardOffer): Promise<MemberCardOffer>;
    refundConsume(memberCardOfferId: string): Promise<MemberCardOffer>;
}
