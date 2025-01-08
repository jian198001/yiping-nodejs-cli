import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { DeliveryCompany } from '../../entity/DeliveryCompany';
/**
 * 物流公司服务类
 */
export declare class DeliveryCompanyService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询物流公司数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询物流公司数据
     * @param id - 物流公司ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除物流公司数据
     * @param ids - 物流公司ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新物流公司数据
     * @param obj - 物流公司对象
     * @returns 更新后的物流公司对象
     */
    update(obj: DeliveryCompany): Promise<DeliveryCompany>;
}
