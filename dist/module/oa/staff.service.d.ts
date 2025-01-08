import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Staff } from '../../entity/Staff';
/**
 * 员工服务类
 * 提供员工的注册、分页查询、根据ID查询、删除以及更新功能
 */
export declare class StaffService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 注册员工
     * @param staff - 员工对象
     * @returns 注册成功的员工对象
     */
    reg(staff: Staff): Promise<Staff>;
    /**
     * 分页查询员工
     * @param deptId - 部门ID
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(deptId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询员工
     * @param id - 员工ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据ID数组删除员工
     * @param ids - 员工ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新员工信息
     * @param obj - 员工对象
     * @returns 更新后的员工对象
     */
    update(obj: Staff): Promise<Staff>;
}
