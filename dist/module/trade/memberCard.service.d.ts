import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { MemberCard } from "../../entity/MemberCard";
/**
 * 会员卡服务类
 */
export declare class MemberCardService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
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
    update(obj: MemberCard): Promise<MemberCard>;
    /**
     * 检查会员卡基本信息
     * @param card - 会员卡对象
     * @returns 无返回值
     */
    checkCardBaseInfo(card: any): Promise<void>;
    /**
     * 解密会员卡代码
     * @param encryptCode - 加密的会员卡代码
     * @returns 无返回值
     */
    decryptCardCode(encryptCode: any): Promise<void>;
    /**
     * 查询会员卡代码
     * @param cardId - 会员卡ID
     * @param code - 会员卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    queryCardCode(cardId: string, code: string, checkConsume: boolean): Promise<void>;
    /**
     * 消费会员卡代码
     * @param code - 会员卡代码
     * @returns 无返回值
     */
    consumeCardCode(code: string): Promise<void>;
    /**
     * 更新用户会员卡状态
     * @param memberCardOffer - 用户会员卡对象
     * @returns 无返回值
     */
    updateUserCardStatus(memberCardOffer: any): Promise<void>;
    /**
     * 标记会员卡代码
     * @param code - 会员卡代码
     * @param cardId - 会员卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    markCardCode(code: string, cardId: string, shopBuyerId: string, isMark: boolean): Promise<void>;
    /**
     * 获取会员卡详情
     * @param cardId - 会员卡ID
     * @returns 无返回值
     */
    getCardDetail(cardId: string): Promise<void>;
    /**
     * 创建会员卡
     * @param cardCreateMessage - 创建会员卡消息对象
     * @param goods - 商品对象
     * @returns 无返回值
     */
    createCard(cardCreateMessage: any, goods: any): Promise<void>;
    /**
     * 创建会员卡优惠
     * @param cardCreateMessage - 创建会员卡消息对象
     * @param quantity - 数量
     * @returns 无返回值
     */
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
