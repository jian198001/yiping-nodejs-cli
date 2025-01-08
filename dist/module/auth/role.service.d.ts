import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Role } from '../../entity/Role';
/**
 * 角色服务类
 * 提供角色的增删改查、分页查询、初始化以及更新数据范围等功能
 */
export declare class RoleService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private roleMenuMapRepository;
    private roleDeptMapRepository;
    /**
     * 分页查询角色
     * @param userId - 用户ID
     * @param allocated - 是否已分配
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(userId: string, allocated: boolean, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询角色
     * @param id - 角色ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除角色
     * @param ids - 角色ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新角色
     * @param obj - 角色对象
     * @returns 更新后的角色对象
     */
    update(obj: Role): Promise<Role>;
    /**
     * 更新角色的数据范围
     * @param obj - 角色对象
     * @returns 更新
     */
    updateDataScope(obj: Role): Promise<Role>;
    init(): Promise<void>;
}
