import { Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Stock } from '../../entity/Stock';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

@Provide()
export class StockService extends BaseService {
  // 查询的数据库表名称
  private static TABLE_NAME = 'stock';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${StockService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql} 
  , ( SELECT name FROM material WHERE t.material_id = material.id ) AS material_name
  , ( SELECT sku AS material_sku FROM material WHERE t.material_id = material.id ) AS material_sku 
     `;

  @InjectEntityModel(Stock)
  private repository: Repository<Stock> = null;

  public async page(
    query = '', params: string, reqParam: ReqParam,
    page: Page,
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ' AND t.quantity > 0 '; // 查询条件字符串

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

    console.log('test');

    console.log(JSON.stringify(data));

    return data

  }

  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql)
  }

  public async del(ids: string[]): Promise<void> {
    // 根据id数组删除多条数据
    await this?.repository?.delete?.(ids,)
  }
}
