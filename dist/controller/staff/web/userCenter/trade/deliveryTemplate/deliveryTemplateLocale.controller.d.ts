import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { DeliveryTemplateLocale } from '../../../../../../entity/DeliveryTemplateLocale';
/**
 * 员工用户中心配送模板地区控制器
 */
export declare class StaffWebUserCenterDeliveryTemplateDeliveryTemplateLocaleController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入配送模板地区服务
     */
    private deliveryTemplateLocaleService;
    /**
     * 获取配送模板地区分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取配送模板地区信息
     *
     * @param id - 配送模板地区ID
     * @returns 返回配送模板地区信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除配送模板地区
     *
     * @param ids - 配送模板地区ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新配送模板地区信息
     *
     * @param obj - 配送模板地区对象
     * @returns 返回更新结果
     */
    update(obj: DeliveryTemplateLocale): Promise<any>;
}
