import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Inbill } from '../../entity/Inbill';
import { InbillItem } from '../../entity/InbillItem';
/**
 * 入库单服务类
 * 提供入库单的增删改查以及采购入库、领用归还入库等功能
 */
export declare class InbillService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private stockRepository;
    private consumeRepository;
    /**
     * 分页查询入库单
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询入库单
     * @param id - 入库单ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除入库单
     * @param ids - 入库单ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新入库单
     * @param obj - 入库单对象
     * @returns 更新后的入库单对象
     */
    update(obj: Inbill): Promise<Inbill>;
    /**
     * 采购入库
     * @param obj - 入库单对象
     * @param purchaseOrderId - 采购订单ID
     * @returns 更新后的入库单对象
     */
    purchaseInbill(obj: Inbill, purchaseOrderId?: string): Promise<Inbill>;
    consumeInbill(obj: Inbill, items: any[]): Promise<Inbill>;
    consumeInbillItem(items: any[]): Promise<InbillItem>;
}
