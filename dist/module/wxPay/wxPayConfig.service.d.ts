import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { WxPayConfig } from "../../entity/WxPayConfig";
/**
 * 微信支付配置服务类
 * 提供微信支付配置的分页查询、根据ID查询、删除、更新等功能
 */
export declare class WxPayConfigService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询微信支付配置
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询微信支付配置
     * @param id - 微信支付配置ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除微信支付配置
     * @param ids - 微信支付配置ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新微信支付配置
     * @param obj - 微信支付配置对象
     * @returns 更新后的微信支付配置对象
     */
    update(obj: WxPayConfig): Promise<WxPayConfig>;
}
