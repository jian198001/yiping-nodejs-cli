import { App, Logger, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { BaseService } from '../common/service/base.service';
import { ILogger } from '@midwayjs/logger';
import { Zero0Error } from '../common/model/Zero0Error';

import * as fileUtils from '../common/utils/fileUtils';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../common/model/User';
import { Repository } from 'typeorm';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';

const crypto: any = require('../common/utils/crypto');

import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';
import { UserRoleMap, } from '../../entity/UserRoleMap';
import _ = require('lodash');

/**
 * 用户服务类
 * 提供用户的增删改查、分页查询、密码重置、更新密码、登录、获取微信配置、获取访问令牌、获取OpenID、生成小程序码等功能
 */
@Provide()
export class UserService extends BaseService {
  // 日志记录器
  @Logger()
  private logger: ILogger = null;

  // 应用程序实例
  @App()
  private app: Application = null;

  // 查询的数据库表名称
  private static TABLE_NAME = 'user';

  // 默认初始化密码
  private static initPwd = 'aaaa1111';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${UserService?.TABLE_NAME} t `;

  // 查询结果集要返回的列名称，其中label和value是给select组件的option使用 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  
  
     `;

  // 注入User实体的Repository
  @InjectEntityModel(User)
  private repository: Repository<User> = null;

  // 注入UserRoleMap实体的Repository
  @InjectEntityModel(UserRoleMap)
  private userRoleMapRepository: Repository<UserRoleMap> = null;

  private log = '';

  /**
   * 分页查询用户
   * @param query - 查询条件字符串
   * @param params - 前端传递的参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns 分页查询结果
   */
  public async page(
    query = '', params: string,
    reqParam: ReqParam,
    page: Page,
  ): Promise<any> {
    // 分页列表查询数据

    console?.log(this?.log);

    let whereSql = ' '; // 查询条件字符串

    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue); // 处理前端的搜索字符串的搜索需求

    // sqlUtils?.whereOrFilters处理element-plus表格筛选功能提交的筛选数据
    // sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr将pro.ant.design表格筛选栏提交的对象形式的数据，转化成SQL LIKE 语句 
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize'])) + sqlUtils?.query?.(query); // 处理前端的表格中筛选需求

    // 执行查询语句并返回page对象结果
    const data: any = await super.pageBase?.(
      this?.selectSql,
      this?.fromSql,
      whereSql,
      reqParam,
      page,
    );

    // 遍历查询结果,将查询结果异步读取到redis

    for (const item of data?.list) {
      
      this?.getById?.(item?.id);

    }

    if (page?.pageSize > 0) {
      return data;
    }

    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value');
    }
  }

  /**
   * 根据ID查询用户
   * @param id - 用户ID
   * @returns 查询结果
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    const data: any = await super.getByIdBase?.(id, this?.selectSql, this?.fromSql);

    const userRoleMaps: UserRoleMap[] = await this.userRoleMapRepository?.findBy?.({ userId: id });

    const roleIds = [];

    for (const item of userRoleMaps) {
      roleIds?.push?.(item?.roleId);
    }

    data.roleIds = roleIds;

    return data;
  }

  /**
   * 根据ID数组删除用户
   * @param ids - 用户ID数组
   * @returns 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 删除redis缓存

    for (const id of ids) {
      const key = UserService.TABLE_NAME + `:${id}`;

      await this?.redisService?.del?.(key);
    }

    // 调用delete方法，根据ID删除数据
    await this?.repository?.delete?.(ids);
  }

  /**
   * 重置用户密码
   * @param id - 用户ID
   * @returns 无返回值
   */
  public async resetPwd(id: string): Promise<void> {
    // 一个表进行操作 typeORM

    let old: User = await this?.repository?.findOneById?.(id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    old = {
      ...old,
      password: crypto?.md5?.(UserService?.initPwd),
    };

    await this?.repository?.save?.(old); // 修改数据
  }

  /**
   * 更新用户密码
   * @param obj - 用户对象
   * @returns 无返回值
   */
  public async updatePwd(obj: any): Promise<void> {
    // 一个表进行操作 typeORM

    let log = '';

    obj.password = crypto?.md5?.(obj?.password);
    obj.passwordNew = crypto?.md5?.(obj?.passwordNew);

    let old: User = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    // 验证原密码是否正确
    if (obj?.password !== old?.password) {
      log = '原密码输入错误';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }

    old = {
      ...old,
      password: obj?.passwordNew,
    };

    await this?.repository?.save?.(old); // 修改数据
  }

  /**
   * 更新用户信息及角色
   * @param obj - 用户对象
   * @param roleIds - 角色ID数组
   * @returns 更新后的用户对象
   */
  public async update(obj: User, roleIds: string[]): Promise<User> {
    // 一个表进行操作 typeORM

    console.log(obj);

    try {
      if (obj?.password) {
        obj.password = crypto?.md5?.(obj?.password);
      }

      let log = '';

      // 字段非重复性验证
      const uniqueText = await super.unique?.(
        UserService?.TABLE_NAME,
        [],
        obj?.id
      );

      if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
        log = uniqueText + '已存在，操作失败';

        const zero0Error: Zero0Error = new Zero0Error(log, '5000');
        this?.logger?.error?.(log, zero0Error);
        throw zero0Error;
      }
      // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
      if (!obj?.id) {
        // 新增数据，主键id的随机字符串值，由后端typeorm提供
        log = '新增数据，主键id的随机字符串值，由后端typeorm提供';

        this?.logger?.info?.(log);
        await this?.repository?.save?.(obj) // insert update

        if (!obj?.orderNum) {
          await super.sortOrder?.(obj?.id, null, null, UserService?.TABLE_NAME,) // 新增数据时，设置此条数据的orderNum排序值
        }

        await this?.updateRoles?.(obj?.id, roleIds)

        return null
      }

      let old: User = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

      await this?.updateRoles?.(obj?.id, roleIds)

      if (!old) {
        // 新增数据，主键id的随机字符串值，由前端页面提供

        await this?.repository?.save?.(obj) // insert update

        console.log('old');

        if (!obj?.orderNum) {
          await super.sortOrder?.(obj?.id, null, null, UserService?.TABLE_NAME,) // 新增数据时，设置此条数据的orderNum排序值
        }
        return null
      }
      delete obj?.id

      old = {
        ...old,

        ...obj,
      };

      await this?.repository?.save?.(old) // 修改数据

    } catch (e) {

      console.log(e);

    }

  }

  private async updateRoles(userId: string, roleIds: string[]): Promise<any> {

    // 先把此用户相关的角色都删除

    await this?.userRoleMapRepository?.delete?.({ userId: userId, })

    if (!roleIds || roleIds.length < 1) {
      return
    }

    for (const roleId of roleIds) {

      const userRoleMap = new UserRoleMap()

      userRoleMap.userId = userId

      userRoleMap.roleId = roleId

      await this?.userRoleMapRepository?.save?.(userRoleMap,)

    }

  }

  public async login(
    code = 'the code is a mock one',
    shopId = '',
    sceneType: string
  ): Promise<any> {
    let wechatConfig: any = await this?.getWechatConfig(shopId);

    // https://www.npmjs.com/package/wechat-jssdk

    wechatConfig = {
      ...wechatConfig,
      //小程序配置
      miniProgram: {
        appId: wechatConfig.appId,
        appSecret: wechatConfig.appSecret,
      },
    };

    const { Wechat } = require('wechat-jssdk'),
      wx: any = new Wechat(wechatConfig);

    const openid: any = await wx.miniProgram.getSession(code, null);

    wechatConfig = {
      ...wechatConfig,
      ...openid,
    };

    return wechatConfig;
  }

  public async getWechatConfig(shopId = ''): Promise<any> {
    let log = '查询此店铺的微信小程序配置信息';

    const sql = ` ${this?.selectSql} ${this?.fromSql} WHERE t.shop_id = '${shopId}' `;

    const result: any[] = await super.query?.(sql);

    if (!result) {
      log = '未查询到此店铺的微信小程序配置信息';

      const zero0Error: Zero0Error = new Zero0Error(log, '5000')
      this?.logger?.error?.(log, zero0Error)
      throw zero0Error
    }

    const wechatConfig: any = result?.[0];

    return wechatConfig;
  }

  public async getAccessToken(shopId = ''): Promise<string> {
    let wechatConfig: any = await this?.getWechatConfig(shopId);

    // https://www.npmjs.com/package/wechat-jssdk

    wechatConfig = {
      ...wechatConfig,
      //小程序配置
      miniProgram: {
        appId: wechatConfig.appId,
        appSecret: wechatConfig.appSecret,
      },
    };

    const { Wechat } = require('wechat-jssdk'),
      wx: any = new Wechat(wechatConfig);

    const getAccessToken: any = await wx.jssdk.getAccessToken?.();

    return getAccessToken.access_token;
  }

  public async getOpenId(shopBuyerId = '', appId = ''): Promise<string> {
    const sql = ` SELECT open_id FROM user_open_id WHERE  app_id = '${appId}' AND user_id = ( SELECT buyer_id FROM shop_buyer WHERE id = '${shopBuyerId}' ) `;

    const result: any[] = await super.query?.(sql);

    if (!result) {
      return null
    }

    return result?.[0]?.openId;
  }

  /**
   * getwxacodeunlimit
   */
  public async getwxacodeunlimit(
    scene = '',
    accessToken = ''
  ): Promise<string> {
    const axios: any = require('axios');

    // 定义要访问的URL地址
    const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`;

    // 发起POST请求
    const res: any = await axios.post(
      url,
      { scene: scene },
      { responseType: 'arraybuffer' }
    );

    const uri: string = fileUtils?.outputFileSync(
      res,
      'qrcode',
      this?.app?.getAppDir()
    );

    return uri;
  }

  public async init(): Promise<void> {

    let log = '初始化用户数据,创建admin用户'

    this.logger.info(log)

    const count: number = await this?.repository?.count?.();

    // 判断数据是否初始化过，如果已初始化，则不会再次初始化

    if (count > 0) {
      return;
    }

    const user = new User();

    user.id = '1';

    user.username = 'admin'

    // 默认密码
    const password: string = crypto?.md5?.(UserService?.initPwd)

    user.password = password

    user.name = '系统管理员';

    const userRoleMap = new UserRoleMap()

    userRoleMap.userId = "1"

    userRoleMap.roleId = "1"

    await this?.userRoleMapRepository?.save?.(userRoleMap)

    await this?.repository?.save?.(user);

  }

}
