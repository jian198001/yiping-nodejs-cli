import { BaseService } from '../common/service/base.service';
import { User } from '../common/model/User';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
/**
 * 用户服务类
 * 提供用户的增删改查、分页查询、密码重置、更新密码、登录、获取微信配置、获取访问令牌、获取OpenID、生成小程序码等功能
 */
export declare class UserService extends BaseService {
    private logger;
    private app;
    private static TABLE_NAME;
    private static initPwd;
    private fromSql;
    private selectSql;
    private repository;
    private userRoleMapRepository;
    private log;
    /**
     * 分页查询用户
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询用户
     * @param id - 用户ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除用户
     * @param ids - 用户ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 重置用户密码
     * @param id - 用户ID
     * @returns 无返回值
     */
    resetPwd(id: string): Promise<void>;
    /**
     * 更新用户密码
     * @param obj - 用户对象
     * @returns 无返回值
     */
    updatePwd(obj: any): Promise<void>;
    /**
     * 更新用户信息及角色
     * @param obj - 用户对象
     * @param roleIds - 角色ID数组
     * @returns 更新后的用户对象
     */
    update(obj: User, roleIds: string[]): Promise<User>;
    private updateRoles;
    login(code: string, shopId: string, sceneType: string): Promise<any>;
    getWechatConfig(shopId?: string): Promise<any>;
    getAccessToken(shopId?: string): Promise<string>;
    getOpenId(shopBuyerId?: string, appId?: string): Promise<string>;
    /**
     * getwxacodeunlimit
     */
    getwxacodeunlimit(scene?: string, accessToken?: string): Promise<string>;
    init(): Promise<void>;
}
