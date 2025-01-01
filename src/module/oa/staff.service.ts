import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Staff } from '../../entity/Staff';
import { Zero0Error } from '../common/model/Zero0Error';
import { ILogger } from '@midwayjs/logger'; 
 
import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
 import _ = require('lodash');
@Provide()
export class StaffService extends BaseService {
  
  @Logger()
  private logger: ILogger = null

// 查询的数据库表名称
  private static TABLE_NAME = 'staff';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${StaffService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

  , ( SELECT name FROM dept WHERE dept.id = t.dept_id ) AS dept_name
  , '' AS title
  , mobile AS phone
     `;

  @InjectEntityModel(Staff)
  private repository: Repository<Staff> = null;

  public async reg(staff: Staff): Promise<Staff> {
    let log = '';

    const count: number = await this?.repository?.countBy({ 
    });

    if (count > 0 ) {
      log = '用户名已存在,注册失败';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    await this?.repository?.save?.(staff);

    return staff;
  }

  public async page(
    deptId: string, 
    query = '', params: string,
    reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    let whereSql = ' ' // 查询条件字符串
 
    if (deptId) {
      whereSql += ` AND t.dept_id = '${deptId}' `;
    }

    whereSql +=  sqlUtils?.like?.(['name', 'mobile'], reqParam?.searchValue, ) // 处理前端的搜索字符串的搜索需求
// sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  // 处理前端的表格中筛选需求
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

  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    const object: any = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    if (!object) {
      return null
    }
 
    return object;
  }
 
  public async del(idsArr: string[]): Promise<void> {
     
    await this?.repository?.delete?.(idsArr)
  
  }

  public async update(obj: Staff): Promise<Staff> {
    // 一个表进行操作 typeORM

    let log = '';

   // 字段非重复性验证
   const uniqueText = await super.unique?.(StaffService?.TABLE_NAME, [], obj?.id); // 新增或修改数据时，判断某字段值在数据库中是否已重复

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
 
      obj = await this?.repository?.save?.(obj) // insert update
    } else {
      let staff: Staff = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

      if (!staff) {
        await this?.repository?.save?.(obj) // insert update

        return null
      }

      staff = {
        ...staff,

        ...obj,
      };

      await this?.repository?.save?.(staff);
    }
 
    return obj;
  }
 
}
