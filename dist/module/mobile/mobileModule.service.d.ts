import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { MobileModule } from '../../entity/MobileModule';
/**
 * 移动模块服务类
 * 提供移动模块的增删改查功能
 */
export declare class MobileModuleService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    /**
     * 分页查询移动模块
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询移动模块
     * @param id - 移动模块ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除移动模块
     * @param ids - 移动模块ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新移动模块
     * @param obj - 移动模块对象
     * @returns 更新后的移动模块对象
     */
    update(obj: MobileModule): Promise<MobileModule>;
    /**
     * 更新页面配置
     * @param packageUview2 - 包路径
     * @param pathModule - 模块路径
     * @returns 无返回值
     */
    updatePages(packageUview2: string, pathModule: string): Promise<void>;
    /**
     * 遍历页面数组并添加路径
     * @param pages - 页面数组
     * @param path - 路径
     * @returns 更新后的页面数组
     */
    private forEachPages;
}
