import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { DeliveryList } from '../../entity/DeliveryList';
/**
 * 发货单服务类
 */
export declare class DeliveryListService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询发货单数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询发货单数据
     * @param id - 发货单ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除发货单数据
     * @param ids - 发货单ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新发货单数据
     * @param obj - 发货单对象
     * @returns 更新后的发货单对象
     */
    update(obj: DeliveryList): Promise<DeliveryList>;
    /**
     * 同意售后
     * @param orderId - 售后单号
     * @param addressId - 同意退货时传入地址id
     * @returns 无返回值
     */
    acceptapply(orderId: string, addressId: string): Promise<void>;
    /**
     * 拒绝售后
     * @param orderId - 售后单号
     * @param rejectReason - 拒绝原因
     * @returns 无返回值
     */
    rejectrefund(orderId: string, rejectReason: string): Promise<void>;
}
