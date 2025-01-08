import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { PickupTemplate } from '../../entity/PickupTemplate';
/**
 * 提货模板服务类
 */
export declare class PickupTemplateService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询提货模板
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询提货模板
     * @param id - 提货模板ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除提货模板
     * @param ids - 提货模板ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新提货模板
     * @param obj - 提货模板对象
     * @returns Promise<PickupTemplate> - 返回更新后的提货模板对象
     */
    update(obj: PickupTemplate): Promise<PickupTemplate>;
}
