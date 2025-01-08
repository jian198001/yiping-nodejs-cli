import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Post } from '../../entity/Post';
/**
 * 岗位服务类
 * 提供岗位的分页查询、根据ID查询、树形结构查询、删除、更新以及根据角色ID获取岗位列表等功能
 */
export declare class PostService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询岗位
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询岗位
     * @param id - 岗位ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 查询岗位树形结构
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @returns 岗位树形结构数据
     */
    tree(query: string, params: any, reqParam: ReqParam): Promise<any[]>;
    /**
     * 根据ID数组删除岗位
     * @param ids - 岗位ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新岗位
     * @param obj - 岗位对象
     * @returns 更新后的岗位对象
     */
    update(obj: Post): Promise<Post>;
    /**
     * 根据角色ID获取岗位列表
     * @param roleId - 角色ID
     * @returns 岗位ID列表
     */
    getListByRoleId(roleId: string): Promise<string[]>;
    /**
     * 初始化岗位数据
     * @returns 无返回值
     */
    init(): Promise<void>;
}
