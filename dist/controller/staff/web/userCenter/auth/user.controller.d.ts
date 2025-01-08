import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { User } from "../../../../../module/common/model/User";
/**
 * 用户Web用户中心认证用户控制器
 * 处理与用户相关的HTTP请求，如分页查询、根据ID查询、删除、更新、更新密码、重置密码、根据Token获取用户信息、获取用户详情、获取用户设置和获取用户中心信息
 */
export declare class UserWebUserCenterAuthUserController {
    private ctx;
    private logger;
    private userService;
    /**
     * 分页查询用户
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询用户
     * @param id - 用户ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除用户
     * @param ids - 用户ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新用户
     * @param obj - 用户对象
     * @param roleIds - 角色ID数组
     * @returns 返回更新结果
     */
    update(obj: User, roleIds: any): Promise<any>;
    /**
     * 更新用户密码
     * @param obj - 包含新密码的对象
     * @returns 返回更新结果
     */
    updatePwd(obj: any): Promise<any>;
    /**
     * 重置用户密码
     * @param id - 用户ID
     * @returns 返回重置结果
     */
    resetPwd(id: string): Promise<any>;
    /**
     * 根据Token获取用户信息
     * @returns 返回用户信息
     */
    getByToken(): Promise<any>;
    /**
     * 获取用户详情
     * @returns 返回用户详情
     */
    detail(): Promise<any>;
    /**
     * 获取用户设置
     * @returns 返回用户设置
     */
    setting(): Promise<any>;
    center(): Promise<any>;
}
