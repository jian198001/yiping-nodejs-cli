import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Dept } from '../../entity/Dept';
/**
 * 部门服务类
 * 提供部门的增删改查、分页查询以及根据角色ID获取部门列表等功能
 */
export declare class DeptService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询部门
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询部门
     * @param id - 部门ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID删除部门及其子部门
     * @param id - 部门ID
     * @returns 无返回值
     */
    del(id: string): Promise<void>;
    /**
     * 更新部门
     * @param obj - 部门对象
     * @returns 更新后的部门对象
     */
    update(obj: Dept): Promise<Dept>;
    /**
     * 更新部门代码
     * @param obj - 部门对象
     * @returns 无返回值
     */
    private updateCode;
    getListByRoleId(roleId: string): Promise<string[]>;
}
