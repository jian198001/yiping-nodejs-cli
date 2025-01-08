import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Address } from "../../entity/Address";
/**
 * 地址服务类
 */
export declare class AddressService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询地址列表
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询地址
     * @param id - 地址ID
     * @returns Promise<any> - 返回查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除地址
     * @param ids - 地址ID数组
     * @returns Promise<void> - 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新地址
     * @param obj - 地址对象
     * @returns Promise<Address> - 返回更新后的地址对象
     */
    update(obj: Address): Promise<Address>;
}
