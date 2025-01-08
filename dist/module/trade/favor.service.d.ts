import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Favor } from '../../entity/Favor';
/**
 * 收藏服务类
 */
export declare class FavorService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询收藏数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询收藏数据
     * @param id - 收藏ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除收藏数据
     * @param ids - 收藏ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新或新增收藏数据
     * @param obj - 收藏对象
     * @returns 更新后的收藏对象或null
     */
    update(obj: Favor): Promise<Favor>;
}
