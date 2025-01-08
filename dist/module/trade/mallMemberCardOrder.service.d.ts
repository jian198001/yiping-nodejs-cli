import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { TradeOrder } from '../../entity/TradeOrder';
/**
 * 交易订单服务类
 */
export declare class MallMemberCardService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询交易订单数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询交易订单数据
     * @param id - 交易订单ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除交易订单数据
     * @param ids - 交易订单ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新交易订单数据
     * @param obj - 交易订单对象
     * @returns 更新后的交易订单对象
     */
    update(obj: TradeOrder): Promise<TradeOrder>;
    /**
     * 购买会员卡
     * @param memberCardId - 会员卡ID
     * @param selectedNum - 选择数量
     * @param shopBuyerId - 店铺买家ID
     * @returns 无返回值
     */
    buy(memberCardId: string, selectedNum: number, shopBuyerId?: string): Promise<void>;
    /**
     * 保存会员卡优惠信息
     * @param xmlData - XML数据
     * @returns 无返回值
     */
    saveMemberCardOffer(xmlData: string): Promise<void>;
    /**
     * 创建会员卡优惠
     * @param outTradeNo - 外部交易号
     * @param resultCode - 结果代码
     * @returns 无返回值
     */
    createMemberCardOffers(outTradeNo: string, resultCode: string): Promise<void>;
    /**
     * 购买商城会员卡
     * @param shopId - 店铺ID
     * @param memberCardId - 会员卡ID
     * @param selectedNum - 选择数量
     * @param shopBuyerId - 店铺买家ID
     * @returns 无返回值
     */
    buyMallMemberCard(shopId: string, memberCardId: string, selectedNum: number, shopBuyerId?: string): Promise<void>;
    /**
     * 更新店铺结束时间
     * @param xmlData - XML数据
     * @returns 无返回值
     */
    updateShopEndTime(xmlData: string): Promise<void>;
}
