import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { ProfitSharing } from '../../entity/ProfitSharing';
/**
 * 分润服务类
 */
export declare class ProfitSharingService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private log;
    /**
     * 分页查询分润记录
     * @param shopBuyerId - 店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(shopBuyerId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询分润记录
     * @param id - 分润记录ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除分润记录
     * @param ids - 分润记录ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新分润记录
     * @param obj - 分润记录对象
     * @returns Promise<ProfitSharing> - 返回更新后的分润记录对象
     */
    update(obj: ProfitSharing): Promise<ProfitSharing>;
}
