import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { BuyerReceiveAddress } from "../../../../../entity/BuyerReceiveAddress";
/**
 * 买家用户中心收货地址控制器
 */
export declare class BuyerUniUserCenterReceiveAddressReceiveAddressController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入买家收货地址服务
     */
    private buyerReceiveAddressService;
    /**
     * 获取收货地址分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取收货地址
     *
     * @param id - 收货地址ID
     * @returns 返回收货地址信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新收货地址
     *
     * @param obj - 收货地址对象
     * @returns 返回更新结果
     */
    update(obj: BuyerReceiveAddress): Promise<any>;
}
