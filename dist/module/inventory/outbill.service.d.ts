import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Outbill } from '../../entity/Outbill';
import { OutbillItem } from '../../entity/OutbillItem';
/**
 * 出库单服务类
 * 提供出库单的增删改查以及物料领用等功能
 */
export declare class OutbillService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private stockRepository;
    private outbillItemRepository;
    private consumeRepository;
    /**
     * 分页查询出库单
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询出库单
     * @param id - 出库单ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除出库单
     * @param ids - 出库单ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新出库单
     * @param obj - 出库单对象
     * @returns 更新后的出库单对象
     */
    update(obj: Outbill): Promise<Outbill>;
    /**
     * 物料领用
     * @param obj - 出库单对象
     * @param items - 出库单项数组
     * @param staffId - 员工ID
     * @returns 更新后的出库单对象
     */
    consume(obj: Outbill, items: OutbillItem[], staffId: string): Promise<Outbill>;
    private updateItems;
}
