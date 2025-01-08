import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { MobileModule } from '../../../../../entity/MobileModule';
/**
 * 员工Web用户中心移动模块控制器
 * 处理与移动模块相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterMobileMobileModuleController {
    private ctx;
    private logger;
    private mobileModuleService;
    /**
     * 分页查询移动模块
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询移动模块
     * @param id - 移动模块ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除移动模块
     * @param ids - 移动模块ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新移动模块
     * @param obj - 移动模块对象
     * @returns 返回更新结果
     */
    update(obj: MobileModule): Promise<any>;
}
