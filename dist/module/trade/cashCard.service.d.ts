import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { CashCard } from '../../entity/CashCard';
/**
 * 现金卡服务类
 */
export declare class CashCardService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询现金卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询现金卡数据
     * @param id - 现金卡ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除现金卡数据
     * @param ids - 现金卡ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新现金卡数据
     * @param obj - 现金卡对象
     * @returns 更新后的现金卡对象
     */
    update(obj: CashCard): Promise<CashCard>;
    /**
     * 检查现金卡基本信息
     * @param card - 现金卡对象
     * @returns 无返回值
     */
    checkCardBaseInfo(card: any): Promise<void>;
    /**
     * 解密现金卡代码
     * @param encryptCode - 加密的现金卡代码
     * @returns 无返回值
     */
    decryptCardCode(encryptCode: any): Promise<void>;
    /**
     * 查询现金卡代码
     * @param cardId - 现金卡ID
     * @param code - 现金卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    queryCardCode(cardId: string, code: string, checkConsume: boolean): Promise<void>;
    /**
     * 消费现金卡代码
     * @param code - 现金卡代码
     * @returns 无返回值
     */
    consumeCardCode(code: string): Promise<void>;
    /**
     * 更新用户现金卡状态
     * @param memberCardOffer - 用户现金卡优惠对象
     * @returns 无返回值
     */
    updateUserCardStatus(memberCardOffer: any): Promise<void>;
    /**
     * 标记现金卡代码
     * @param code - 现金卡代码
     * @param cardId - 现金卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    markCardCode(code: string, cardId: string, shopBuyerId: string, isMark: boolean): Promise<void>;
    /**
     * 获取现金卡详情
     * @param cardId - 现金卡ID
     * @returns 无返回值
     */
    getCardDetail(cardId: string): Promise<void>;
    /**
     * 创建现金卡
     * @param cardCreateMessage - 现金卡创建消息对象
     * @param goods - 商品对象
     * @returns 无返回值
     */
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
