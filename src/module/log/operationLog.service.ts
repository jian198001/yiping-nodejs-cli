// 引入必要的模块和装饰器
import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ILogger } from '@midwayjs/logger';
import { OperationLog } from '../../entity/OperationLog';
import { Zero0Error } from '../common/model/Zero0Error';
import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import _ = require('lodash');

/**
 * 操作日志服务类
 * 提供操作日志的增删改查功能
 */
@Provide()
export class OperationLogService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = 'operation_log';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${OperationLogService?.TABLE_NAME} t `;

  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  `;

  // 注入OperationLog实体的Repository
  @InjectEntityModel(OperationLog)
  private repository: Repository<OperationLog> = null;

  /**
   * 分页查询操作日志
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = '', params: string, reqParam: ReqParam,
    page: Page,
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ' '; // 查询条件字符串

    let parameters: any[] = [];

    if (params && params.length > 3) {
      parameters = JSON?.parse?.(params);
    }

    // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(parameters, ['current', 'pageSize'])) + sqlUtils?.like?.(['name'], reqParam?.searchValue) + sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.query?.(query);

    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    if (page?.pageSize > 0) {
      return data;
    }

    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value');
    }
  }

  /**
   * 根据ID查询操作日志
   * @param id - 操作日志ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql);
  }

  /**
   * 删除操作日志
   * @param ids - 操作日志ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids);
  }

  /**
   * 更新操作日志
   * @param obj - 操作日志对象
   * @returns 更新后的操作日志对象
   */
  public async update(obj: OperationLog): Promise<OperationLog> {
    // 一个表进行操作 typeORM

    let log = '';

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      OperationLogService?.TABLE_NAME,
      null,
      obj?.id
    );

    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    // 新增数据，主键id的随机字符串值，由后端typeorm提供
    if (!obj?.id) {
      log = '新增数据，主键id的随机字符串值，由后端typeorm提供';

      delete obj?.id;

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, OperationLogService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    let old: OperationLog = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj); // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, OperationLogService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
      return null;
    }

    delete obj?.id;

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old); // 修改数据
  }
}
