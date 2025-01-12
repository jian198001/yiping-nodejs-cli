import { App, Logger, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { BaseService } from '../../../../../common/service/base.service';
import { ILogger } from '@midwayjs/logger';
import { Zero0Error } from '../../../../../common/model/Zero0Error';

import * as fileUtils from '../../../../../../module/common/utils/fileUtils';

/**
 * 用户服务类
 * 提供微信登录、获取微信配置、获取访问令牌、获取用户OpenID以及生成小程序码等功能
 */
@Provide()
export class UserService extends BaseService {
  
  // 日志记录器
  @Logger()
  private logger: ILogger = null;
  
  // 应用实例
  @App()
  private app: Application = null;
  
  // 查询的数据库表名称
  private static TABLE_NAME = 'wx_pay_config';
  
  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${UserService?.TABLE_NAME} t `;
  
  // 查询结果集要返回的列名称，其中label和value是给select组件的option使用
  private selectSql = ` ${BaseService.selSql}  
  
  `;
  
  /**
   * 用户登录
   * @param code - 微信登录凭证
   * @param shopId - 店铺ID
   * @param sceneType - 场景类型
   * @returns 登录成功后的微信配置信息
   */
  public async login(
    code = 'the code is a mock one',
    shopId = '',
    sceneType: string
  ): Promise<any> {
    // 获取微信配置信息
    let wechatConfig: any = await this?.getWechatConfig(shopId);

    // 配置微信小程序
    wechatConfig = {
      ...wechatConfig,
      //小程序配置
      miniProgram: {
        appId: wechatConfig.appId,
        appSecret: wechatConfig.appSecret,
      },
    };

    // 引入wechat-jssdk库
    const { Wechat } = require('wechat-jssdk'),
      wx: any = new Wechat(wechatConfig);

    // 获取微信会话信息
    const openid: any = await wx.miniProgram.getSession(code, null);

    // 合并微信配置和会话信息
    wechatConfig = {
      ...wechatConfig,
      ...openid,
    };

    return wechatConfig;
  }
  
  /**
   * 获取微信配置信息
   * @param shopId - 店铺ID
   * @returns 微信配置信息
   */
  public async getWechatConfig(shopId = ''): Promise<any> {
    let log = '查询此店铺的微信小程序配置信息';
  
    // 构建查询SQL语句
    const sql = ` ${this?.selectSql} ${this?.fromSql} WHERE t.shop_id = '${shopId}' `;
  
    // 执行查询
    const result: any[] = await super.query?.(sql);
  
    // 如果查询结果为空，记录错误日志并抛出异常
    if (!result) {
      log = '未查询到此店铺的微信小程序配置信息';
  
      const zero0Error: Zero0Error = new Zero0Error(log, '5000');
      this?.logger?.error?.(log, zero0Error);
      throw zero0Error;
    }
  
    // 返回查询结果中的第一条记录
    const wechatConfig: any = result?.[0];
  
    return wechatConfig;
  }
  
  /**
   * 获取微信访问令牌
   * @param shopId - 店铺ID
   * @returns 微信访问令牌
   */
  public async getAccessToken(shopId = ''): Promise<string> {
    // 获取微信配置信息
    let wechatConfig: any = await this?.getWechatConfig(shopId);
  
    // 配置微信小程序
    wechatConfig = {
      ...wechatConfig,
      //小程序配置
      miniProgram: {
        appId: wechatConfig.appId,
        appSecret: wechatConfig.appSecret,
      },
    };
  
    // 引入wechat-jssdk库
    const { Wechat } = require('wechat-jssdk'),
      wx: any = new Wechat(wechatConfig);
  
    // 获取微信访问令牌
    const getAccessToken: any = await wx.jssdk.getAccessToken?.();
  
    return getAccessToken.access_token;
  }
  
  /**
   * 获取用户OpenID
   * @param shopBuyerId - 店铺买家ID
   * @param appId - 应用ID
   * @returns 用户OpenID
   */
  public async getOpenId(shopBuyerId = '', appId = ''): Promise<string> {
    // 构建查询SQL语句
    const sql = ` SELECT open_id FROM user_open_id WHERE  app_id = '${appId}' AND user_id = ( SELECT buyer_id FROM shop_buyer WHERE id = '${shopBuyerId}' ) `;
  
    // 执行查询
    const result: any[] = await super.query?.(sql);
  
    // 如果查询结果为空，返回null
    if (!result) {
       return ' '
    }
  
    return result?.[0]?.openId;
  }
  
  /**
   * 生成小程序码
   * @param scene - 场景值
   * @param accessToken - 微信访问令牌
   * @returns 小程序码的文件路径
   */
  public async getwxacodeunlimit(
    scene = '',
    accessToken = ''
  ): Promise<string> {
    // 引入axios库
    const axios: any = require('axios');
  
    // 定义要访问的URL地址
    const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`;
  
    // 发起POST请求
    const res: any = await axios.post(
      url,
      { scene: scene },
      { responseType: 'arraybuffer' }
    );
  
    // 将返回的二进制数据写入文件，并返回文件路径
    const uri: string = fileUtils?.outputFileSync(
      res,
      'qrcode',
      this?.app?.getAppDir()
    );
  
    return uri;
  }
}
