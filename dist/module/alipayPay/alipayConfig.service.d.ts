import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { AlipayConfig } from "../../entity/AlipayConfig";
/**
 * 支付宝配置服务类
 * 提供支付宝配置的增删改查以及分页查询功能
 */
export declare class AlipayConfigService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询支付宝配置
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询支付宝配置
     * @param id - 支付宝配置ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除支付宝配置
     * @param ids - 支付宝配置ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新支付宝配置
     * @param obj - 支付宝配置对象
     * @returns 更新后的支付宝配置对象
     */
    update(obj: AlipayConfig): Promise<AlipayConfig>;
}
