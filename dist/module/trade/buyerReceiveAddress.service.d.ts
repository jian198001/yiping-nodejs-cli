/**
 * 导入自定义的基础服务类
 */
import { BaseService } from '../common/service/base.service';
/**
 * 导入请求参数模型
 */
import { ReqParam } from '../common/model/ReqParam';
/**
 * 导入分页模型
 */
import { Page } from '../common/model/Page';
/**
 * 导入买家收货地址实体类
 */
import { BuyerReceiveAddress } from '../../entity/BuyerReceiveAddress';
/**
 * 买家收货地址服务类
 */
export declare class BuyerReceiveAddressService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private shopRepository;
    private shopBuyerService;
    /**
     * 分页查询买家收货地址
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(shopBuyerId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询买家收货地址
     * @param id - 收货地址ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除买家收货地址
     * @param ids - 收货地址ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新买家收货地址
     * @param obj - 买家收货地址对象
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<BuyerReceiveAddress> - 返回更新后的买家收货地址对象
     */
    update(obj: BuyerReceiveAddress, shopBuyerId: string): Promise<BuyerReceiveAddress>;
    /**
     * 获取买家默认收货地址
     * @param buyerId - 买家ID
     * @param shopId - 店铺ID
     * @returns Promise<BuyerReceiveAddress> - 返回默认收货地址对象
     */
    getDefalut(buyerId: string, shopId?: string): Promise<BuyerReceiveAddress>;
}
