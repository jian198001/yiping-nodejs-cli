import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Dlg } from '../../entity/Dlg';
/**
 * Dlg服务类
 * 提供Dlg的分页查询、根据ID查询、删除、更新等功能
 */
export declare class DlgService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private app;
    private repository;
    /**
     * 分页查询Dlg
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询Dlg
     * @param id - Dlg ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除Dlg
     * @param ids - Dlg ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新Dlg
     * @param obj - Dlg对象
     * @returns 更新后的Dlg对象
     */
    update(obj: Dlg): Promise<Dlg>;
}
