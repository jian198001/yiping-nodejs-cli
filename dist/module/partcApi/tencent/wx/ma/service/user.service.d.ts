import { BaseService } from '../../../../../common/service/base.service';
/**
 * 用户服务类
 * 提供微信登录、获取微信配置、获取访问令牌、获取用户OpenID以及生成小程序码等功能
 */
export declare class UserService extends BaseService {
    private logger;
    private app;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    /**
     * 用户登录
     * @param code - 微信登录凭证
     * @param shopId - 店铺ID
     * @param sceneType - 场景类型
     * @returns 登录成功后的微信配置信息
     */
    login(code: string, shopId: string, sceneType: string): Promise<any>;
    /**
     * 获取微信配置信息
     * @param shopId - 店铺ID
     * @returns 微信配置信息
     */
    getWechatConfig(shopId?: string): Promise<any>;
    /**
     * 获取微信访问令牌
     * @param shopId - 店铺ID
     * @returns 微信访问令牌
     */
    getAccessToken(shopId?: string): Promise<string>;
    /**
     * 获取用户OpenID
     * @param shopBuyerId - 店铺买家ID
     * @param appId - 应用ID
     * @returns 用户OpenID
     */
    getOpenId(shopBuyerId?: string, appId?: string): Promise<string>;
    /**
     * 生成小程序码
     * @param scene - 场景值
     * @param accessToken - 微信访问令牌
     * @returns 小程序码的文件路径
     */
    getwxacodeunlimit(scene?: string, accessToken?: string): Promise<string>;
}
