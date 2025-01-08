import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { GoodsMessage } from '../../entity/GoodsMessage';
/**
 * 商品消息服务类
 */
export declare class GoodsMessageService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private skuService;
    /**
     * 分页查询商品消息数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询商品消息数据
     * @param id - 商品消息ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除商品消息数据
     * @param ids - 商品消息ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新商品消息数据
     * @param obj - 商品消息对象
     * @returns 更新后的商品消息对象
     */
    update(obj: GoodsMessage): Promise<GoodsMessage>;
    /**
     * 从购物车消息中获取中文描述
     * @param cartMessages - 购物车消息字符串
     * @returns 中文描述字符串
     */
    getCnStrFromCart(cartMessages: string): Promise<string>;
    /**
     * 获取商品消息
     * @param goodsId - 商品ID
     * @returns 商品消息数组
     */
    getMessage(goodsId: string): Promise<any[]>;
    /**
     * 保存商品消息
     * @param obj - 商品消息对象
     * @returns 保存成功的消息ID
     */
    saveGoodsMessage(obj: GoodsMessage): Promise<string>;
    /**
     * 插入消息到消息列表
     * @param listMessagesStr - 消息列表字符串
     * @param messages - 要插入的消息对象
     * @returns 更新后的消息列表字符串
     */
    insertMessages(listMessagesStr: string, messages: any): Promise<string>;
    /**
     * 插入购物车消息到购物车消息列表
     * @param listCartMessagesStr - 购物车消息列表字符串
     * @param cartMessages - 要插入的购物车消息对象
     * @returns 更新后的购物车消息列表字符串
     */
    insertCartMessages(listCartMessagesStr: any, cartMessages: any): Promise<string>;
}
