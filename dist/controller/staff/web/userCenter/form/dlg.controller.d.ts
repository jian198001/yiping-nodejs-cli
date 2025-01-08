import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { Dlg } from '../../../../../entity/Dlg';
/**
 * 员工Web用户中心表单对话框控制器
 * 处理与对话框相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebUserCenterDlgDlgController {
    private ctx;
    private logger;
    private dlgService;
    /**
     * 分页查询对话框
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询对话框
     * @param id - 对话框ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除对话框
     * @param ids - 对话框ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新对话框
     * @param obj - 对话框对象
     * @returns 返回更新结果
     */
    update(obj: Dlg): Promise<any>;
}
