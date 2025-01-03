import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Consume } from '../../entity/Consume';
import { Zero0Error } from '../common/model/Zero0Error';
import { ILogger } from '@midwayjs/logger';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

/**
 * 消耗服务类
 * 提供消耗记录的增删改查以及分页查询功能
 */
@Provide()
export class ConsumeService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  // 查询的数据库表名称
  private static TABLE_NAME = 'consume';
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${ConsumeService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  , ( SELECT name FROM staff WHERE staff.id = t.staff_id ) AS staff_name
  , ( SELECT name FROM material WHERE material.id = t.material_id ) AS material_name
  , ( SELECT sku FROM material WHERE material.id = t.material_id ) AS material_sku
     `;
  // 注入Consume实体的Repository
  @InjectEntityModel(Consume)
  private repository: Repository<Consume> = null;
  /**
   * 分页查询消耗记录
   * @param staffId - 员工ID
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(staffId: string,
    query: string, params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ` AND t.quantity > 0 AND t.staff_id = '${staffId}' `; // 查询条件字符串

    if (reqParam?.searchValue) {

      whereSql += ` AND t.material_id IN ( SELECT id FROM material WHERE name LIKE '%${reqParam?.searchValue}%' ) `

    }
    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求

    const data = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    )
 
    return data

  }
  /**
   * 根据ID查询消耗记录
   * @param id - 消耗记录ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql)
  }
 
  /**
   * 删除消耗记录
   * @param ids - 消耗记录ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids, )
  }

  /**
   * 更新消耗记录
   * @param obj - 消耗记录对象
   * @returns 更新后的消耗记录对象
   */
  public async update(obj: Consume): Promise<Consume> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(
      ConsumeService?.TABLE_NAME,
      null,
      obj?.id
    );

    if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + '已存在，操作失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = '新增数据，主键id的随机字符串值，由后端typeorm提供'

      delete obj?.id

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, ConsumeService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    let old: Consume = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    if (!old) {
      // 新增数据，主键id的随机字符串值，由前端页面提供

      await this?.repository?.save?.(obj) // insert update

      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, ConsumeService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
      return null
    }

    delete obj?.id

    old = {
      ...old,

      ...obj,
    };

    await this?.repository?.save?.(old) // 修改数据
  }
  // 采购入库->purchase采购信息->inbill->形成入库单，记录入库信息->stock库存信息
  // 领用出库->stock库存信息->consume->形成出库单，记录出库信息
  // 领用信息表->谁领用了哪些物料 staffId materialId quantity
  // 归还入库->inbill->形成入库单，记录归还入库信息->stock库存信息
}
