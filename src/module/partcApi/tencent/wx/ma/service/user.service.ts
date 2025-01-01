import { App, Logger, Provide } from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';
import { BaseService } from '../../../../../common/service/base.service';
import { ILogger } from '@midwayjs/logger';
import { Zero0Error } from '../../../../../common/model/Zero0Error';

import * as fileUtils from '../../../../../../module/common/utils/fileUtils';

@Provide()
export class UserService extends BaseService {
  
  @Logger()
  private logger: ILogger = null

  @App()
  private app: Application = null;

// 查询的数据库表名称
  private static TABLE_NAME = 'wx_pay_config';

// 查询的数据库表名称及别名
  private fromSql = ` FROM ${UserService?.TABLE_NAME} t `;

// 查询结果集要返回的列名称，其中label和value是给select组件的option使用
private selectSql = ` ${BaseService.selSql}  
  
`

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
}
