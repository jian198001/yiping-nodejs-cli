import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { SignIn } from '../../entity/SignIn';
/**
 * 签到服务类
 * 提供签到的分页查询、根据ID查询、删除、签到等功能
 */
export declare class SignInService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private log;
    /**
     * 分页查询签到记录
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询签到记录
     * @param id - 签到记录ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除签到记录
     * @param ids - 签到记录ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 签到
     * @param obj - 签到对象
     * @returns 签到后的签到对象
     */
    signIn(obj: SignIn): Promise<SignIn>;
}
