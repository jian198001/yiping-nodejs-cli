import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { SignIn } from '../../../../../entity/SignIn';
/**
 * 买家用户中心签到控制器
 */
export declare class BuyerUniUserCenterSignInSignInController {
    /**
     * 注入上下文对象
     */
    private ctx;
    /**
     * 注入日志记录器
     */
    private logger;
    /**
     * 注入签到服务
     */
    private signInService;
    /**
     * 获取签到分页列表
     *
     * @param query - 查询条件
     * @param params - 参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID获取签到信息
     *
     * @param id - 签到ID
     * @returns 返回签到信息
     */
    getById(id: string): Promise<any>;
    /**
     * 执行签到操作
     *
     * @param obj - 签到对象
     * @returns 返回签到结果
     */
    signIn(obj: SignIn): Promise<any>;
}
