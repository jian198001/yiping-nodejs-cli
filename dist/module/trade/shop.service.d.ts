import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Shop } from '../../entity/Shop';
import { WxPayConfig } from '../../entity/WxPayConfig';
import { AlipayConfig } from '../../entity/AlipayConfig';
import { Address } from '../../entity/Address';
export declare class ShopService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private addressRepository;
    private wxPayConfigRepository;
    private alipayConfigRepository;
    /**
     * 分页查询店铺列表
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     * @description 根据前端的搜索、筛选条件，分页查询店铺列表，并返回符合条件的店铺信息
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询店铺信息
     * @param id - 店铺ID
     * @returns Promise<any> - 返回查询到的店铺信息
     * @description 根据id查询一条数据，包括店铺的基本信息、微信支付配置和支付宝支付配置
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据店铺代码获取店铺信息
     * @param code - 店铺代码
     * @returns Promise<Shop> - 返回查询到的店铺信息
     */
    getByCode(code?: string): Promise<Shop>;
    /**
     * 删除指定ID的店铺
     * @param ids - 要删除的店铺ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新店铺信息，包括地址、微信支付配置和支付宝支付配置
     * @param obj - 店铺信息对象
     * @param address - 地址信息对象
     * @param wxPayConfig - 微信支付配置对象
     * @param alipayConfig - 支付宝支付配置对象
     * @returns Promise<Shop> - 返回更新后的店铺信息
     */
    update(obj: Shop, address?: Address, wxPayConfig?: WxPayConfig, alipayConfig?: AlipayConfig): Promise<Shop>;
    /**
     * 配置微信支付信息
     * @param appId - 微信支付的应用ID
     * @param mchId - 微信支付的商户ID
     * @param mchKey - 微信支付的商户密钥
     * @param keyPath - 微信支付的密钥路径
     * @returns Promise<boolean> - 返回配置是否成功
     */
    confWxpay(appId: string, mchId: string, mchKey: string, keyPath: string): Promise<boolean>;
    /**
     * 配置支付宝支付信息
     * @param appId - 支付宝应用ID
     * @param merchantPrivateKey - 商户私钥
     * @param merchantCertPath - 商户证书路径
     * @returns Promise<boolean> - 返回配置是否成功
     */
    confAlipay(appId: string, merchantPrivateKey: string, merchantCertPath: string): Promise<boolean>;
    /**
     * 获取店铺的支付配置信息
     * @param id - 店铺ID
     * @returns Promise<void> - 无返回值
     * @description mall是商城，下面会有多个shop，mall和shop都保存有商户的收款信息，有两种情况会从mall读取收款配置信息，1是卖家向商城付款，2是卖家没有自己的收款账户，钱先打进商城的收款账户，然后再转给卖家
     */
    getPayConfig(id: string): Promise<void>;
    /**
     * 用户登录
     * @param usernamePasswordToken - 包含用户名和密码的对象
     * @returns Promise<Shop> - 返回登录成功的店铺信息
     */
    login(usernamePasswordToken: any): Promise<Shop>;
    /**
     * 上传微信支付密钥文件
     * @param map - 包含文件内容的对象
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns Promise<void> - 无返回值
     */
    wxpayKeyFileUpload(map: any, fileName: string, fileType: string, shopId?: string): Promise<void>;
    /**
     * 上传支付宝商户证书文件
     * @param map - 包含文件内容的对象
     * @param fileName - 文件名
     * @param fileType - 文件类型
     * @param shopId - 店铺ID
     * @returns Promise<void> - 无返回值
     */
    alipayMerchantCertFileUpload(map: any, fileName: string, fileType: string, shopId?: string): Promise<void>;
    /**
     * 更新店铺的微信支付配置
     * @param shopId - 店铺ID
     * @param appIdWxpay - 微信支付的应用ID
     * @param mchId - 微信支付的商户ID
     * @param mchKey - 微信支付的商户密钥
     * @returns Promise<void> - 无返回值
     */
    updateWxPayConfig(shopId: string, appIdWxpay: string, mchId: string, mchKey: string): Promise<void>;
    /**
     * 更新店铺的支付宝支付配置
     * @param shopId - 店铺ID
     * @param appIdAlipay - 支付宝支付的应用ID
     * @param merchantPrivateKey - 支付宝支付的商户私钥
     * @returns Promise<void> - 无返回值
     */
    updateAlipayConfig(shopId: string, appIdAlipay: string, merchantPrivateKey: string): Promise<void>;
    /**
     * 更新店铺的许可证信息
     * @param obj - 包含许可证信息的对象
     * @returns Promise<void> - 无返回值
     */
    updateLicense(obj: any): Promise<void>;
    /**
     * 上传图片到本地多媒体素材库并持久化到数据库
     * @returns Promise<void> - 无返回值
     */
    imgUpload(): Promise<void>;
    /**
     * 上传文件到本地多媒体素材库并持久化到数据库
     * @returns Promise<void> - 无返回值
     */
    uploadFile(): Promise<void>;
    /**
     * 根据文件ID删除图片
     * @param fileId - 图片文件ID
     * @returns Promise<void> - 无返回值
     */
    imgDel(fileId: string): Promise<void>;
    /**
     * 将店铺与用户进行绑定
     * @param shopSellerMap - 包含店铺与用户绑定信息的对象
     * @returns Promise<void> - 无返回值
     */
    bindUser(shopSellerMap: any): Promise<void>;
    /**
     * 查询指定店铺支持的配送方式
     * @param shopId - 店铺ID
     * @returns Promise<any> - 返回支持的配送方式信息
     */
    supportedShippingmethods(shopId?: string): Promise<any>;
}
