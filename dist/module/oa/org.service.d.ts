import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Org } from "../../entity/Org";
/**
 * 组织服务类
 * 提供组织的增删改查、分页查询以及根据角色ID获取组织列表等功能
 */
export declare class OrgService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询组织
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询组织
     * @param id - 组织ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除组织
     * @param ids - 组织ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新组织
     * @param obj - 组织对象
     * @returns 更新后的组织对象
     */
    update(obj: Org): Promise<Org>;
    /**
     * 更新组织代码
     * @param obj - 组织对象
     * @returns 无返回值
     */
    private updateCode;
    getListByRoleId(roleId: string): Promise<string[]>;
    init(): Promise<void>;
}
