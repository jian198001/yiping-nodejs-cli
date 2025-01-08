import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { GeneralCouponCard } from '../../entity/GeneralCouponCard';
/**
 * 通用优惠券卡服务类
 */
export declare class GeneralCouponCardService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询通用优惠券卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询通用优惠券卡数据
     * @param id - 通用优惠券卡ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除通用优惠券卡数据
     * @param ids - 通用优惠券卡ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新通用优惠券卡数据
     * @param obj - 通用优惠券卡对象
     * @returns 更新后的通用优惠券卡对象
     */
    update(obj: GeneralCouponCard): Promise<GeneralCouponCard>;
    /**
     * 检查通用优惠券卡基本信息
     * @param card - 通用优惠券卡对象
     * @returns 无返回值
     */
    checkCardBaseInfo(card: any): Promise<void>;
    /**
     * 解密通用优惠券卡代码
     * @param encryptCode - 加密的通用优惠券卡代码
     * @returns 无返回值
     */
    decryptCardCode(encryptCode: any): Promise<void>;
    /**
     * 查询通用优惠券卡代码
     * @param cardId - 通用优惠券卡ID
     * @param code - 通用优惠券卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    queryCardCode(cardId: string, code: string, checkConsume: boolean): Promise<void>;
    /**
     * 消费通用优惠券卡代码
     * @param code - 通用优惠券卡代码
     * @returns 无返回值
     */
    consumeCardCode(code: string): Promise<void>;
    /**
     * 更新用户通用优惠券卡状态
     * @param memberCardOffer - 用户通用优惠券卡对象
     * @returns 无返回值
     */
    updateUserCardStatus(memberCardOffer: any): Promise<void>;
    /**
     * 标记通用优惠券卡代码
     * @param code - 通用优惠券卡代码
     * @param cardId - 通用优惠券卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    markCardCode(code: string, cardId: string, shopBuyerId: string, isMark: boolean): Promise<void>;
    /**
     * 获取通用优惠券卡详情
     * @param cardId - 通用优惠券卡ID
     * @returns 无返回值
     */
    getCardDetail(cardId: string): Promise<void>;
    createCard(cardCreateMessage: any, goods: any): Promise<void>;
    createCardOffer(cardCreateMessage: any, quantity: number): Promise<void>;
    createQrcodeCard(cardId: string, outerStr: string, expiresIn: number, shopBuyerId: string, code: string, isUniqueCode: boolean): Promise<void>;
    unavailableCardCode(cardId: string, code: string, reason: string): Promise<void>;
    deleteCard(cardId: string): Promise<void>;
    cardCodeDeposit(cardId: string, codeList: string[]): Promise<void>;
    cardCodeDepositCount(cardId: string): Promise<void>;
    cardCodeCheckcode(cardId: string, codeList: string[]): Promise<void>;
    cardMpnewsGethtml(cardId: string): Promise<void>;
    cardModifyStock(cardId: string, changeValue: number): Promise<void>;
    cardCodeUpdate(cardId: string, oldCode: string, newCode: string): Promise<void>;
    cardPaycellSet(cardId: string, isOpen: boolean): Promise<void>;
    cardSelfConsumeCellSet(cardId: string, isOpen: boolean, needVerifyCod: boolean, needRemarkAmount: boolean): Promise<void>;
    getUserCardList(shopBuyerId: string, cardId: string): Promise<void>;
    beginCard(code: string, shopBuyerId: string, cardId: string): Promise<void>;
    userGetCard(code: string, shopBuyerId: string, cardId: string, orderItemId: string): Promise<void>;
    auditRefund(orderId: string): Promise<void>;
    activate(code: string, cardId: string, activateBeginTime: any, activateEndTime: any, initBonus: number, initBalance: number): Promise<void>;
}
