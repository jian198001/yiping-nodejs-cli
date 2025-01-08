import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
/**
 * 员工用户中心买家控制器
 */
export declare class StaffWebUserCenterTradeOrderBuyerBuyerController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入店铺买家服务
     */
    private shopBuyerService;
    /**
     * 获取当前用户的父关联用户
     *
     * @param id - 用户ID
     * @returns 返回父关联用户信息
     */
    getParent(id: string): Promise<any>;
    /**
     * 获取当前用户的子一级关联用户
     *
     * @param id - 用户ID
     * @returns 返回子一级关联用户信息
     */
    getChildren(id: string): Promise<any>;
    /**
     * 获取买家分页列表
     *
     * @param parentShopBuyerId - 父店铺买家ID
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(parentShopBuyerId: string, query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取买家信息
     *
     * @param id - 买家ID
     * @returns 返回买家信息
     */
    getById(id: string): Promise<any>;
}
