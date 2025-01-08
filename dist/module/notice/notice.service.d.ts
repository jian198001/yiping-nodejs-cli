import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Notice } from "../../entity/Notice";
/**
 * 通知消息服务类
 * 提供通知消息的增删改查功能
 */
export declare class NoticeService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    private log;
    /**
     * 分页查询通知消息
     * @param query - 查询条件字符串
     * @param params - 前端传递的参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询通知消息
     * @param id - 通知消息ID
     * @returns 查询结果
     */
    getById(id?: string): Promise<any>;
    /**
     * 删除通知消息
     * @param ids - 通知消息ID数组
     * @returns 无返回值
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新通知消息
     * @param obj - 通知消息对象
     * @returns 更新后的通知消息对象
     */
    update(obj: Notice): Promise<Notice>;
}
