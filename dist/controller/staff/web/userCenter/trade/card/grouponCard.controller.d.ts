import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { GrouponCard } from '../../../../../../entity/GrouponCard';
/**
 * 员工用户中心团购卡控制器
 */
export declare class StaffWebUserCenterCardGrouponCardController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入团购卡服务
     */
    private grouponCardService;
    /**
     * 获取团购卡分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取团购卡信息
     *
     * @param id - 团购卡ID
     * @returns 返回团购卡信息
     */
    getById(id: string): Promise<any>;
    /**
     * 删除团购卡
     *
     * @param ids - 团购卡ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新团购卡信息
     *
     * @param obj - 团购卡对象
     * @returns 返回更新结果
     */
    update(obj: GrouponCard): Promise<any>;
}
