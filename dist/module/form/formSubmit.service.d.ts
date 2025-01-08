import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { FormSubmit } from '../../entity/FormSubmit';
/**
 * 表单提交服务类
 * 提供表单提交记录的增删改查以及分页查询功能
 */
export declare class FormSubmitService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private log;
    /**
     * 分页查询表单提交记录
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询表单提交记录
     * @param id - 表单提交记录ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除表单提交记录
     * @param ids - 表单提交记录ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新表单提交记录
     * @param obj - 表单提交记录对象
     * @returns 更新后的表单提交记录对象
     */
    update(obj: FormSubmit): Promise<FormSubmit>;
}
