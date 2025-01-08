import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { DiscountCard } from '../../../../../../entity/DiscountCard';
/**
 * 员工用户中心折扣卡控制器
 */
export declare class StaffWebUserCenterCardDiscountCardController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入折扣卡服务
     */
    private discountCardService;
    /**
     * 获取折扣卡分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取折扣卡信息
     *
     * @param id - 折扣卡ID
     * @returns 返回折扣卡信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除折扣卡
     *
     * @param ids - 折扣卡ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新折扣卡信息
     *
     * @param obj - 折扣卡对象
     * @returns 返回更新结果
     */
    update(obj: DiscountCard): Promise<any>;
}
