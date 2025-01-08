import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { GeneralCouponCard } from '../../../../../../entity/GeneralCouponCard';
/**
 * 员工用户中心通用优惠券卡控制器
 */
export declare class StaffWebUserCenterCardGeneralCouponCardController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入通用优惠券卡服务
     */
    private generalCouponCardService;
    /**
     * 获取通用优惠券卡分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取通用优惠券卡信息
     *
     * @param id - 通用优惠券卡ID
     * @returns 返回通用优惠券卡信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除通用优惠券卡
     *
     * @param ids - 通用优惠券卡ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新通用优惠券卡信息
     *
     * @param obj - 通用优惠券卡对象
     * @returns 返回更新结果
     */
    update(obj: GeneralCouponCard): Promise<any>;
}
