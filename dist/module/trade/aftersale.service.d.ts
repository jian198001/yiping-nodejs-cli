import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Aftersale } from '../../entity/Aftersale';
/**
 * 售后服务类
 */
export declare class AftersaleService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询售后服务记录
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询售后服务记录
     * @param id - 售后服务记录ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除售后服务记录
     * @param ids - 售后服务记录ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新售后服务记录
     * @param obj - 售后服务记录对象
     * @returns Promise<Aftersale> - 返回更新后的售后服务记录对象
     */
    update(obj: Aftersale): Promise<Aftersale>;
    /**
     * 同意售后申请
     * @param orderId - 售后单号
     * @param addressId - 同意退货时传入地址id
     * @returns Promise<void> - 无返回值
     */
    acceptapply(orderId: string, addressId: string): Promise<void>;
    /**
     * 拒绝退款申请
     * @param orderId - 售后单号
     * @param rejectReason - 拒绝原因
     * @returns Promise<void> - 无返回值
     */
    rejectrefund(orderId: string, rejectReason: string): Promise<void>;
}
