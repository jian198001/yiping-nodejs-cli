import { ReqParam } from '../../../../module/common/model/ReqParam';
import { Page } from '../../../../module/common/model/Page';
import { FormSubmit } from '../../../../entity/FormSubmit';
/**
 * 员工Web前端页面表单提交控制器
 * 处理与表单提交相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
export declare class StaffWebFrontPageFormFormSubmitController {
    private ctx;
    private logger;
    private formSubmitService;
    /**
     * 分页查询表单提交记录
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询表单提交记录
     * @param id - 表单提交记录ID
     * @returns 返回查询结果
     */
    getById(id: string): Promise<any>;
    /**
     * 删除表单提交记录
     * @param ids - 表单提交记录ID数组
     * @returns 返回删除结果
     */
    del(ids: string[]): Promise<any>;
    /**
     * 更新表单提交记录
     * @param obj - 表单提交记录对象
     * @returns 返回更新结果
     */
    update(obj: FormSubmit): Promise<any>;
}
