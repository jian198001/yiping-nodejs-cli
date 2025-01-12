import { Logger, Provide } from "@midwayjs/decorator";
import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { Repository } from "typeorm";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { ILogger } from "@midwayjs/logger";
import { Role } from "../../entity/Role";
import { RoleMenuMap } from "../../entity/RoleMenuMap";
import { RoleDeptMap } from "../../entity/RoleDeptMap";
import { Zero0Error } from "../common/model/Zero0Error";

import * as sqlUtils from "../common/utils/sqlUtils";
import * as strUtils from "../common/utils/strUtils";
import _ = require("lodash");

/**
 * 角色服务类
 * 提供角色的增删改查、分页查询、初始化以及更新数据范围等功能
 */
@Provide()
export class RoleService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 查询的数据库表名称
  private static TABLE_NAME = "role";

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${RoleService?.TABLE_NAME} t `;
  // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;
  // 注入Role实体的Repository
  @InjectEntityModel(Role)
  private repository: Repository<Role> = null;
  // 注入RoleMenuMap实体的Repository
  @InjectEntityModel(RoleMenuMap)
  private roleMenuMapRepository: Repository<RoleMenuMap> = null;
  // 注入RoleDeptMap实体的Repository
  @InjectEntityModel(RoleDeptMap)
  private roleDeptMapRepository: Repository<RoleDeptMap> = null;
  /**
   * 分页查询角色
   * @param userId - 用户ID
   * @param allocated - 是否已分配
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    userId: string,
    allocated: boolean,
    query = "",
    params: string,
    reqParam: ReqParam,
    page: Page
  ): Promise<any> {
    // 分页列表查询数据
    let whereSql = " "; // 查询条件字符串
    if (userId) {
      if (allocated) {
        // 查询已分配给指定用户的角色
        whereSql =
          whereSql +
          ` AND t.id IN ( SELECT role_id FROM user_role_map WHERE user_id = '${userId}' ) `;
      } else {
        // 查询未分配给指定用户的角色
        whereSql =
          whereSql +
          ` AND t.id NOT IN ( SELECT role_id FROM user_role_map WHERE user_id = '${userId}' ) `;
      }
    }
    // 处理前端的搜索字符串的搜索需求
    whereSql += sqlUtils?.like?.(["name", "role_key"], reqParam?.searchValue);
    let parameters: any[] = [];
    if (params && params.length > 3) {
      // 解析前端传递的参数
      parameters = JSON?.parse?.(params);
    }
    // 处理前端的表格中筛选需求
    whereSql +=
      sqlUtils?.mulColumnLike?.(
        strUtils?.antParams2Arr?.(parameters, ["current", "pageSize"])
      ) +
      sqlUtils?.whereOrFilters?.(reqParam?.filters) +
      sqlUtils?.query?.(query);
    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page
    );

    // 遍历查询结果,将查询结果中异步读取到redis

    this?.getToRedis?.(_?.map?.(data?.list, "id"));

    if (page?.pageSize > 0) {
      return data;
    }
    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, "value");
    }
  }

  private async getToRedis(ids) {
    // 根据id查询一条数据

    for (const id of ids) {
      await this?.getById?.(id);
    }
  }

  /**
   * 根据ID查询角色
   * @param id - 角色ID
   * @returns 查询结果
   */
  public async getById(id = ""): Promise<any> {
    // 记录日志
    this?.logger?.info?.("根据ID查询通知消息");

    // 根据id查询一条数据

    // 查看缓存中是否有此数据

    const key = RoleService.TABLE_NAME + `:${id}`;

    let data: any = await this?.redisService?.get?.(key);

    // 缓存中有此数据，直接返回

    if (data) {
      const parse = JSON.parse(data);

      return parse;
    }

    // 缓存中没有此数据，查询数据库

    // 调用父类的getByIdBase方法，根据ID查询数据

    data = await super.getByIdBase?.(id, this?.selectSql, this?.fromSql);

    // 查询数据库后，把数据放入缓存

    await this?.redisService?.set?.(key, JSON.stringify(data));

    // 返回数据

    return data;
  }
  /**
   * 根据ID数组删除角色
   * @param ids - 角色ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = RoleService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    } // 调用delete方法，根据ID删除数据

    await this?.repository?.delete?.(ids);
  }
  /**
   * 更新角色
   * @param obj - 角色对象
   * @returns 更新后的角色对象
   */
  public async update(obj: Role): Promise<any> {
    // 一个表进行操作 typeORM
    let role: Role = null;
    let log = ""; // 删除redis缓存

    const key = RoleService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      RoleService?.TABLE_NAME,
      [],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复
    if (uniqueText) {
      // 某unique字段值已存在，抛出异常，程序处理终止
      log = uniqueText + "已存在，操作失败";
      const zero0Error: Zero0Error = new Zero0Error(log, "5000");
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
    // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
    if (!obj?.id) {
      // 新增数据，主键id的随机字符串值，由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
      delete obj?.id;
      role = await this?.repository?.save?.(obj); // insert update
      if (!obj?.orderNum) {
        await super.sortOrder?.(obj?.id, null, null, RoleService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
      }
    } else {
      role = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
      if (!role) {
        await this?.repository?.save?.(obj); // insert update
        if (!obj?.orderNum) {
          await super.sortOrder?.(obj?.id, null, null, RoleService?.TABLE_NAME); // 新增数据时，设置此条数据的orderNum排序值
        }
        return;
      }
      role.name = obj?.name;
      role.roleKey = obj?.roleKey;
      role.orderNum = obj?.orderNum;
      role.status = obj?.status;
      role.remark = obj?.remark;
      role = await this?.repository?.save?.(role);
      if (!role?.orderNum) {
        await super.sortOrder?.(role.id, null, null, "role");
      }
    }
    const roleMenuMap: RoleMenuMap = new RoleMenuMap();
    roleMenuMap.roleId = role?.id;
    await this?.roleMenuMapRepository?.remove(roleMenuMap);
    const menuIds: string[] = obj?.menuIds;
    for (const menuId of menuIds) {
      const roleMenuMapNew: RoleMenuMap = new RoleMenuMap();
      delete roleMenuMapNew.id;
      roleMenuMapNew.roleId = role?.id;
      roleMenuMapNew.menuId = menuId;
      await this?.roleMenuMapRepository?.save?.(roleMenuMapNew);
    }
    return;
  }
  /**
   * 更新角色的数据范围
   * @param obj - 角色对象
   * @returns 更新
   */
  public async updateDataScope(obj: Role): Promise<Role> {
    // 一个表进行操作 typeORM
    let role: Role = await this?.repository?.findOne?.({
      where: { id: obj?.id },
    });
    role.dataScope = obj?.dataScope;
    role = await this?.repository?.save?.(role);
    const roleDeptMap: RoleDeptMap = new RoleDeptMap();
    roleDeptMap.roleId = role?.id;
    await this?.roleDeptMapRepository?.remove(roleDeptMap);
    const deptIds: string[] = obj?.deptIds;
    for (const deptId of deptIds) {
      const roleDeptMapNew: RoleDeptMap = new RoleDeptMap();
      delete roleDeptMapNew.id;
      roleDeptMapNew.roleId = role?.id;
      roleDeptMapNew.deptId = deptId;
      await this?.roleDeptMapRepository?.save?.(roleDeptMapNew);
    }
    return role;
  }
  public async init(): Promise<void> {
    let log = "初始化角色数据,创建管理员角色";
    this.logger.info(log);
    const count: number = await this?.repository?.count?.();
    // 判断数据是否初始化过，如果已初始化，则不会再次初始化
    if (count > 0) {
      return;
    }
    const role = new Role();
    role.id = "1";
    role.name = "系统管理员";
    await this?.repository?.save?.(role);
  }
}
