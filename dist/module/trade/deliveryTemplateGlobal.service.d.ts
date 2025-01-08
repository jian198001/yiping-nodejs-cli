import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { DeliveryTemplateGlobal } from '../../entity/DeliveryTemplateGlobal';
/**
 * 全域物流模板服务类
 */
export declare class DeliveryTemplateGlobalService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询全域物流模板数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询全域物流模板数据
     * @param id - 全域物流模板ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除全域物流模板数据
     * @param ids - 全域物流模板ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新全域物流模板数据
     * @param obj - 全域物流模板对象
     * @returns 更新后的全域物流模板对象
     */
    update(obj: DeliveryTemplateGlobal): Promise<DeliveryTemplateGlobal>;
    /**
     * 获取配送总金额
     * @param list - 配送信息列表
     * @returns 配送总金额
     */
    getDeliveryTotalAmount(list: any[]): Promise<number>;
    /**
     * 获取全域物流模板列表
     * @param province - 省份
     * @param shopId - 店铺ID
     * @param list - 商品列表
     * @returns 全域物流模板列表
     */
    getDeliveryTemplateGlobalList(province: string, shopId: string, list: any[]): Promise<any[]>;
    insertArea(id: string, areaName: string, areaId: string): Promise<void>;
}
