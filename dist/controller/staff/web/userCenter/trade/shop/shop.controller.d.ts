import { ReqParam } from "../../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../../module/common/model/Page";
import { Shop } from "../../../../../../entity/Shop";
import { AlipayConfig } from "../../../../../../entity/AlipayConfig";
import { WxPayConfig } from "../../../../../../entity/WxPayConfig";
import { Address } from "../../../../../../entity/Address";
/**
 * 员工用户中心店铺控制器
 */
export declare class StaffWebUserCenterShopShopController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入店铺服务
     */
    private shopService;
    /**
     * 获取店铺分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取店铺信息
     *
     * @param id - 店铺ID
     * @returns 返回店铺信息
     */
    getById(id: string): Promise<any>;
    /**
     * 更新店铺信息
     *
     * @param obj - 店铺对象
     * @param address - 地址对象
     * @param wxPayConfig - 微信支付配置对象
     * @param alipayConfig - 支付宝支付配置对象
     * @param appIdWxpay - 微信支付AppID
     * @param appIdAlipay - 支付宝支付AppID
     * @returns 返回更新结果
     */
    update(obj?: Shop, address?: Address, wxPayConfig?: WxPayConfig, alipayConfig?: AlipayConfig, appIdWxpay?: string, appIdAlipay?: string): Promise<any>;
}
