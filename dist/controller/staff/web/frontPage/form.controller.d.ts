import { ReqParam } from '../../../../module/common/model/ReqParam';
import { Page } from '../../../../module/common/model/Page';
/**
 * 员工Web前端页面表单控制器
 * 处理与表单相关的HTTP请求，如分页查询和根据编码查询表单
 */
export declare class StaffWebFrontPageFormFormController {
    private formService;
    /**
     * 分页查询表单
     * @param query - 查询条件
     * @param params - 查询参数
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页查询结果
     */
    page(query: string, params: any, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据编码查询表单
     * @param code - 表单编码
     * @returns 返回查询结果
     */
    getByCode(code: string): Promise<any>;
}
