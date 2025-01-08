import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { GiftCard } from '../../../../../../entity/GiftCard';
/**
 * 员工用户中心礼品卡控制器
 */
export declare class StaffWebUserCenterCardGiftCardController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入礼品卡服务
     */
    private giftCardService;
    /**
     * 获取礼品卡分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取礼品卡信息
     *
     * @param id - 礼品卡ID
     * @returns 返回礼品卡信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除礼品卡
     *
     * @param ids - 礼品卡ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新礼品卡信息
     *
     * @param obj - 礼品卡对象
     * @returns 返回更新结果
     */
    update(obj: GiftCard): Promise<any>;
}
