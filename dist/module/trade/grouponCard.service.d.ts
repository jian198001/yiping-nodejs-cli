import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { GrouponCard } from '../../entity/GrouponCard';
/**
 * 团购卡服务类
 */
export declare class GrouponCardService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询团购卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询团购卡数据
     * @param id - 团购卡ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除团购卡数据
     * @param ids - 团购卡ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新团购卡数据
     * @param obj - 团购卡对象
     * @returns 更新后的团购卡对象
     */
    update(obj: GrouponCard): Promise<GrouponCard>;
    /**
     * 检查团购卡基本信息
     * @param card - 团购卡对象
     * @returns 无返回值
     */
    checkCardBaseInfo(card: any): Promise<void>;
    /**
     * 解密团购卡代码
     * @param encryptCode - 加密的团购卡代码
     * @returns 无返回值
     */
    decryptCardCode(encryptCode: any): Promise<void>;
    /**
     * 查询团购卡代码
     * @param cardId - 团购卡ID
     * @param code - 团购卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    queryCardCode(cardId: string, code: string, checkConsume: boolean): Promise<void>;
    /**
     * 消费团购卡代码
     * @param code - 团购卡代码
     * @returns 无返回值
     */
    consumeCardCode(code: string): Promise<void>;
    /**
     * 更新用户团购卡状态
     * @param memberCardOffer - 用户团购卡对象
     * @returns 无返回值
     */
    updateUserCardStatus(memberCardOffer: any): Promise<void>;
    /**
     * 标记团购卡代码
     * @param code - 团购卡代码
     * @param cardId - 团购卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    markCardCode(code: string, cardId: string, shopBuyerId: string, isMark: boolean): Promise<void>;
    /**
     * 获取团购卡详情
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    getCardDetail(cardId: string): Promise<void>;
    /**
     * 创建团购卡
     * @param cardCreateMessage - 团购卡创建消息
     * @param goods - 团购卡商品
     * @returns 无返回值
     */
    createCard(cardCreateMessage: any, goods: any): Promise<void>;
    /**
     * 创建团购卡优惠券
     * @param cardCreateMessage - 团购卡创建消息
     * @param quantity - 数量
     * @returns 无返回值
     */
    createCardOffer(cardCreateMessage: any, quantity: number): Promise<void>;
    /**
     * 创建团购卡二维码
     * @param cardId - 团购卡ID
     * @param outerStr - 团购卡外部字符串
     * @param expiresIn - 过期时间
     * @param shopBuyerId - 店铺买家ID
     * @param code - 团购卡代码
     * @param isUniqueCode - 是否唯一代码
     * @returns 无返回值
     */
    createQrcodeCard(cardId: string, outerStr: string, expiresIn: number, shopBuyerId: string, code: string, isUniqueCode: boolean): Promise<void>;
    /**
     * 团购卡代码失效
     * @param cardId - 团购卡ID
     * @param code - 团购卡代码
     * @param reason - 原因
     * @returns 无返回值
     */
    unavailableCardCode(cardId: string, code: string, reason: string): Promise<void>;
    /**
     * 删除团购卡
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    deleteCard(cardId: string): Promise<void>;
    /**
     * 团购卡代码储值
     * @param cardId - 团购卡ID
     * @param codeList - 团购卡代码列表
     * @returns 无返回值
     */
    cardCodeDeposit(cardId: string, codeList: string[]): Promise<void>;
    /**
     * 团购卡代码储值计数
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    cardCodeDepositCount(cardId: string): Promise<void>;
    /**
     * 团购卡代码校验码
     * @param cardId - 团购卡ID
     * @param codeList - 团购卡代码列表
     * @returns 无返回值
     */
    cardCodeCheckcode(cardId: string, codeList: string[]): Promise<void>;
    /**
     * 团购卡图文消息获取html
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    cardMpnewsGethtml(cardId: string): Promise<void>;
    /**
     * 团购卡库存变更
     * @param cardId - 团购卡ID
     * @param changeValue - 变更值
     * @returns 无返回值
     */
    cardModifyStock(cardId: string, changeValue: number): Promise<void>;
    /**
     * 团购卡代码更新
     * @param cardId - 团购卡ID
     * @param oldCode - 旧代码
     * @param newCode - 新代码
     * @returns 无返回值
     */
    cardCodeUpdate(cardId: string, oldCode: string, newCode: string): Promise<void>;
    /**
     * 团购卡支付细胞设置
     * @param cardId - 团购卡ID
     * @param isOpen - 是否开启
     * @returns 无返回值
     */
    cardPaycellSet(cardId: string, isOpen: boolean): Promise<void>;
    /**
     * 团购卡自主消费细胞设置
     * @param cardId - 团购卡ID
     * @param isOpen - 是否开启
     * @param needVerifyCod - 是否需要验证码
     * @param needRemarkAmount - 是否需要备注金额
     * @returns 无返回值
     */
    cardSelfConsumeCellSet(cardId: string, isOpen: boolean, needVerifyCod: boolean, needRemarkAmount: boolean): Promise<void>;
    /**
     * 获取用户团购卡列表
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    getUserCardList(shopBuyerId: string, cardId: string): Promise<void>;
    /**
     * 团购卡开始
     * @param code - 团购卡代码
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    beginCard(code: string, shopBuyerId: string, cardId: string): Promise<void>;
    /**
     * 用户获取团购卡
     * @param code - 团购卡代码
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @param orderItemId - 订单项ID
     * @returns 无返回值
     */
    userGetCard(code: string, shopBuyerId: string, cardId: string, orderItemId: string): Promise<void>;
    /**
     * 审核退款
     * @param orderId - 订单ID
     * @returns 无返回值
     */
    auditRefund(orderId: string): Promise<void>;
    /**
     * 激活团购卡
     * @param code - 团购卡代码
     * @param cardId - 团购卡ID
     * @param activateBeginTime - 激活开始时间
     * @param activateEndTime - 激活结束时间
     * @param initBonus - 初始奖金
     * @param initBalance - 初始余额
     * @returns 无返回值
     */
    activate(code: string, cardId: string, activateBeginTime: any, activateEndTime: any, initBonus: number, initBalance: number): Promise<void>;
}
