import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Mall } from "../../entity/Mall";
/**
 * 商城服务类
 */
export declare class MallService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询商城数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询商城数据
     * @param id - 商城ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除商城数据
     * @param ids - 商城ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新商城数据
     * @param obj - 商城对象
     * @returns 更新后的商城对象
     */
    update(obj: Mall): Promise<Mall>;
    /**
     * 配置微信支付
     * @param appId - 微信支付应用ID
     * @param mchId - 微信支付商户ID
     * @param mchKey - 微信支付商户密钥
     * @param keyPath - 微信支付密钥文件路径
     * @returns 无返回值
     */
    confWxpay(appId: string, mchId: string, mchKey: string, keyPath: string): Promise<void>;
    /**
     * 配置支付宝支付
     * @param appId - 支付宝应用ID
     * @param merchantPrivateKey - 支付宝商户私钥
     * @param merchantCertPath - 支付宝商户证书路径
     * @returns 无返回值
     */
    confAlipay(appId: string, merchantPrivateKey: string, merchantCertPath: string): Promise<void>;
    /**
     * 登录
     * @param usernamePasswordToken - 用户名密码令牌
     * @returns 无返回值
     */
    login(usernamePasswordToken: any): Promise<void>;
    /**
     * 上传微信支付密钥文件
     * @param map - 文件映射
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns 无返回值
     */
    wxpayKeyFileUpload(map: any, fileName: string, fileType: string, shopId?: string): Promise<void>;
    /**
     * 上传支付宝商户证书文件
     * @param map - 文件映射
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns 无返回值
     */
    alipayMerchantCertFileUpload(map: any, fileName: string, fileType: string, shopId?: string): Promise<void>;
    /**
     * 更新微信支付配置
     * @param shopId - 店铺ID
     * @param appIdWxpay - 微信支付应用ID
     * @param mchId
     * @returns 无返回值
     */
    updateWxPayConfig(shopId: string, appIdWxpay: string, mchId: string, mchKey: string): Promise<void>;
    /**
     * 更新支付宝配置
     * @param shopId - 店铺ID
     * @param appIdAlipay - 支付宝应用ID
     * @param merchantPrivateKey - 支付宝商户私钥
     * @returns 无返回值
     */
    updateAlipayConfig(shopId: string, appIdAlipay: string, merchantPrivateKey: string): Promise<void>;
}
