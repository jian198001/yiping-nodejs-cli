import { Page } from "../model/Page";
import { ReqParam } from "../model/ReqParam";
import { RedisService } from "@midwayjs/redis";
export declare abstract class BaseService {
    protected redisService: RedisService;
    private mysqlConf;
    protected static selSql: string;
    /**
     * 分页查询基础方法
     *
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @param whereSql - 查询的条件
     * @param reqParam - 请求参数
     * @param page - 分页信息
     * @returns 返回分页结果
     */
    protected pageBase(selectSql: string, fromSql: string, whereSql: string, reqParam: ReqParam, page: Page): Promise<any>;
    /**
     * 根据ID查询基础方法
     *
     * @param id - 查询的ID
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @returns 返回查询结果
     */
    protected getByIdBase(id: string, selectSql: string, fromSql: string): Promise<any>;
    /**
     * 查询数组基础方法
     *
     * @param reqParam - 请求参数
     * @param selectSql - 查询的字段
     * @param fromSql - 查询的表
     * @param whereSql - 查询的条件
     * @returns 返回查询结果数组
     */
    protected arrBase(reqParam: ReqParam, selectSql: string, fromSql: string, whereSql?: string): Promise<any[]>;
    /**
     * 查询基础方法
     *
     * @param sql - 查询的SQL
     * @returns 返回查询结果数组
     */
    protected query(sql: string): Promise<any[]>;
    /**
     * 排序基础方法
     *
     * @param id - 排序的ID
     * @param prevId - 前一个ID
     * @param nextId - 后一个ID
     * @param tableName - 排序的表名
     * @returns 返回排序后的序号
     */
    protected sortOrder(id: string, prevId: string, nextId: string, tableName: string): Promise<number>;
    protected getOrderNum(orderNumPrev?: number, orderNumNext?: number): Promise<number>;
    getCode(parentCode: string, tableName: string, len?: number, columnName?: string): Promise<string>;
    protected unique(tableName?: string, columnArr?: any[], id?: string): Promise<string>;
}
