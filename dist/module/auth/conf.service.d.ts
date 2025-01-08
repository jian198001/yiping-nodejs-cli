import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Conf } from '../../entity/Conf';
/**
 * 配置服务类
 * 提供配置的增删改查以及分页查询功能
 */
export declare class ConfService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询配置
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询配置
     * @param id - 配置ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除配置
     * @param ids - 配置ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新配置
     * @param obj - 配置对象
     * @returns 更新后的配置对象
     */
    update(obj: Conf): Promise<Conf>;
    /**
     * 根据配置键获取配置值
     * @param key - 配置键
     * @returns 配置值
     */
    getVal(key: string): Promise<string>;
}
