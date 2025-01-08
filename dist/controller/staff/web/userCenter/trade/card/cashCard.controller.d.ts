import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { CashCard } from '../../../../../../entity/CashCard';
/**
 * 员工用户中心现金卡控制器
 */
export declare class StaffWebUserCenterCardCashCardController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入现金卡服务
     */
    private cashCardService;
    /**
     * 获取现金卡分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取现金卡信息
     *
     * @param id - 现金卡ID
     * @returns 返回现金卡信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除现金卡
     *
     * @param ids - 现金卡ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新现金卡信息
     *
     * @param obj - 现金卡对象
     * @returns 返回更新结果
     */
    update(obj: CashCard): Promise<any>;
}
