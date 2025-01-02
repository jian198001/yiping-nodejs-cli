// 导入所需的装饰器和模块
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Favor } from '../../entity/Favor';

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import _ = require('lodash');

/**
 * 收藏服务类
 */
@Provide()
export class FavorService extends BaseService {
  // 查询的数据库表名称
  private static TABLE_NAME = 'favor';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${FavorService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
      
     `

  @InjectEntityModel(Favor)
  private repository: Repository<Favor> = null;

  /**
   * 分页查询收藏数据
   * @param query - 查询字符串
   * @param params - 参数对象
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = '', params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ' ' // 查询条件字符串

    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue, ) 

    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  

    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    )
    
    if (page?.pageSize > 0) {
      return data
    }
  
    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value',)
    }
  }

  /**
   * 根据ID查询收藏数据
   * @param id - 收藏ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据
    return super.getByIdBase?.(id, this?.selectSql, this?.fromSql)
  }

  /**
   * 删除收藏数据
   * @param ids - 收藏ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    await this?.repository?.delete?.(ids, )
  }

  /**
   * 更新或新增收藏数据
   * @param obj - 收藏对象
   * @returns 更新后的收藏对象或null
   */
  public async update(obj: Favor): Promise<Favor> {
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      delete obj?.id
    }

    // 根据商品ID和店铺买家ID查询收藏数据
    const favor: Favor = await this?.repository?.findOneBy?.({
      goodsId: obj.goodsId,
      shopBuyerId: obj.shopBuyerId,
    });

    if (favor) {
      // 如果存在，则删除该收藏数据
      await this?.repository?.remove(favor);
      return;
    }

    // 保存收藏数据
    await this?.repository?.save?.(obj) // insert update

    if (!obj?.orderNum) {
      // 新增数据时，设置此条数据的orderNum排序值
      await super.sortOrder?.(obj?.id, null, null, FavorService?.TABLE_NAME, ) 
    }

    return null
  }
}
