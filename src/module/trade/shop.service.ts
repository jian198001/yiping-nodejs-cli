import { Logger, Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Shop } from '../../entity/Shop';

import { ILogger } from '@midwayjs/logger';

import { Zero0Error } from '../common/model/Zero0Error';
 
import * as sqlUtils from '../common/utils/sqlUtils';
import * as strUtils from '../common/utils/strUtils';

import { WxPayConfig } from '../../entity/WxPayConfig';
import { AlipayConfig } from '../../entity/AlipayConfig';
import { Address } from '../../entity/Address';
import _ = require('lodash');
@Provide()
export class ShopService extends BaseService { // 店铺服务
  @Logger()
  private logger: ILogger = null

  // 查询的数据库表名称
  private static TABLE_NAME = 'shop';

  // 查询的数据库表名称及别名
  private fromSql = ` FROM ${ShopService?.TABLE_NAME} t `;
 // 查询的字段名称及头部的SELECT语句
  private selectSql = ` ${BaseService.selSql}  

  , ( CASE t.cart WHEN '0' THEN '不支持' ELSE '支持' END ) AS cart_str

  , ( CASE t.express WHEN '1' THEN '是' ELSE '否' END ) AS express_str

  , ( CASE t.same_city WHEN '1' THEN '是' ELSE '否' END ) AS same_city_str

  , ( CASE t.obs WHEN '1' THEN '是' ELSE '否' END ) AS obs_str

  , ( CASE t.non_business_hours_show WHEN 'goods' THEN '展示商品,但无法下单' ELSE '可下单支付预订,但延时配送' END ) AS non_business_hours_show_str

  , ( CASE t.refund WHEN '1' THEN '订单是已支付状态下,不需人工审核可直接退款' WHEN '2' THEN '订单是已支付未核销状态下,不需人工审核可直接退款' ELSE '任何状态下都需要人工审核才可以退款' END ) AS refund_str

  , ( CASE t.status WHEN '1' THEN '营业中' ELSE '未营业' END ) AS status_str

  , ( SELECT app_id FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS app_id_wxpay 

  , ( SELECT app_secret FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS app_secret 

  , ( SELECT mch_id FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS mch_id 

  , ( SELECT mch_key FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS mch_key 

  , ( SELECT key_path FROM wx_pay_config WHERE wx_pay_config.shop_id = t.id ) AS key_path 

  , ( SELECT app_id FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS app_id_alipay 

  , ( SELECT merchant_private_key FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS merchant_private_key 

  , ( SELECT merchant_cert_path FROM alipay_config WHERE alipay_config.shop_id = t.id ) AS merchant_cert_path 

     `;

  @InjectEntityModel(Shop)
  private repository: Repository<Shop> = null;

  @InjectEntityModel(Address)
  private addressRepository: Repository<Address> = null;

  @InjectEntityModel(WxPayConfig)
  private wxPayConfigRepository: Repository<WxPayConfig> = null;

  @InjectEntityModel(AlipayConfig)
  private alipayConfigRepository: Repository<AlipayConfig> = null;
  /**
   * 分页查询店铺列表
   * @param query - 查询字符串
   * @param params - 参数字符串
   * @param reqParam - 请求参数对象
   * @param page - 分页对象
   * @returns Promise<any> - 返回分页查询结果
   * @description 根据前端的搜索、筛选条件，分页查询店铺列表，并返回符合条件的店铺信息
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
    // // sqlUtils?.query 处理华为OpenTiny框架的组合条件查询组件(此组件已过期不可用)提交的查询数据
    // 处理前端的表格中筛选需求
    whereSql += sqlUtils?.whereOrFilters?.(reqParam?.filters) + sqlUtils?.mulColumnLike?.(strUtils?.antParams2Arr?.(JSON?.parse?.(params), ['current', 'pageSize', ])) + sqlUtils?.query?.(query)  

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
      // 返回分页数据
      return data
    }
  
    if (page?.pageSize < 1) {
      // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
      return _?.keyBy?.(data?.list, 'value',)
    }
  }
  /**
   * 根据ID查询店铺信息
   * @param id - 店铺ID
   * @returns Promise<any> - 返回查询到的店铺信息
   * @description 根据id查询一条数据，包括店铺的基本信息、微信支付配置和支付宝支付配置
   */
  public async getById(id = ''): Promise<any> {
    // 根据id查询一条数据

    const obj: any = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    obj.confWxpay = true;

    obj.confAlipay = false;

    return obj;
  }
  /**
   * 根据店铺代码获取店铺信息
   * @param code - 店铺代码
   * @returns Promise<Shop> - 返回查询到的店铺信息
   */
  public async getByCode(code = ''): Promise<Shop> {
    // 使用TypeORM的findOneBy方法根据店铺代码查询店铺信息
    return await this?.repository?.findOneBy?.({ code: code });
  }
  /**
   * 删除指定ID的店铺
   * @param ids - 要删除的店铺ID数组
   * @returns Promise<void> - 无返回值
   */
  public async del(ids: string[]): Promise<void> {
    // 使用TypeORM的delete方法删除指定ID的店铺
    await this?.repository?.delete?.(ids, )
  }
  /**
   * 更新店铺信息，包括地址、微信支付配置和支付宝支付配置
   * @param obj - 店铺信息对象
   * @param address - 地址信息对象
   * @param wxPayConfig - 微信支付配置对象
   * @param alipayConfig - 支付宝支付配置对象
   * @returns Promise<Shop> - 返回更新后的店铺信息
   */
  public async update(
    obj: Shop,
    address: Address = null,
    wxPayConfig: WxPayConfig = null,
    alipayConfig: AlipayConfig = null
  ): Promise<Shop> {
    // 一个表进行操作 typeORM

    let log = '';
// 删除redis缓存

    const key = ShopService?.TABLE_NAME + `:${obj?.id}`;

    await this?.redisService?.del?.(key);

    // 字段非重复性验证
    const uniqueText = await super.unique?.(
      ShopService?.TABLE_NAME,
      [{ label: 'name', value: obj.name, text: '名称' }],
      obj?.id
    ); // 新增或修改数据时，判断某字段值在数据库中是否已重复

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
        await super.sortOrder?.(obj?.id, null, null, ShopService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
      }
    } else {
      let old: Shop = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

      if (!old) {
        // 新增数据，主键id的随机字符串值，由前端页面提供

        await this?.repository?.save?.(obj) // insert update

        if (!obj?.orderNum) {
          await super.sortOrder?.(obj?.id, null, null, ShopService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
        }
      } else {
        delete obj?.id

        old = {
          ...old,

          ...obj,
        };

        await this?.repository?.save?.(old) // 修改数据

        obj.id = old?.id;
      }
    }

    // update address

    let addressNew: Address = await this?.addressRepository?.findOne?.({
      where: { shopId: obj?.id },
    });

    if (!addressNew) {
      address.shopId = obj?.id;

      await this?.addressRepository?.save?.(address);
    } else {
      addressNew = {
        ...addressNew,

        ...address,

        shopId: obj?.id,

        id: addressNew?.id,
      };

      await this?.addressRepository?.save?.(addressNew);
    }

    // update wxpayConfig

    let wxPayConfigNew: WxPayConfig = await this?.wxPayConfigRepository?.findOne?.(
      { where: { shopId: obj?.id } }
    );

    if (!wxPayConfigNew) {
      wxPayConfig.shopId = obj?.id;

      await this?.wxPayConfigRepository?.save?.(wxPayConfig);
    } else {
      wxPayConfigNew = {
        ...wxPayConfigNew,

        ...wxPayConfig,

        shopId: obj?.id,

        id: wxPayConfigNew?.id,
      };

      await this?.wxPayConfigRepository?.save?.(wxPayConfigNew);
    }

    // update alipayConfig

    let alipayConfigNew: AlipayConfig =
      await this?.alipayConfigRepository?.findOne?.({
        where: { shopId: obj?.id },
      });

    if (!alipayConfigNew) {
      alipayConfig.shopId = obj?.id;

      await this?.alipayConfigRepository?.save?.(alipayConfig);
    } else {
      alipayConfigNew = {
        ...alipayConfigNew,

        ...alipayConfig,

        shopId: obj?.id,

        id: alipayConfigNew?.id,
      };

      await this?.alipayConfigRepository?.save?.(alipayConfigNew);
    }

    return obj;
  }

  /**
   * 配置微信支付信息
   * @param appId - 微信支付的应用ID
   * @param mchId - 微信支付的商户ID
   * @param mchKey - 微信支付的商户密钥
   * @param keyPath - 微信支付的密钥路径
   * @returns Promise<boolean> - 返回配置是否成功
   */
  public async confWxpay(
    appId: string,
    mchId: string,
    mchKey: string,
    keyPath: string
  ): Promise<boolean> {
    // 记录日志：判断是否已配置完整的微信支付信息
    this?.logger?.info?.('判断是否已配置完整的微信支付信息');

    // 判断配置信息是否完整
    if (
      // 如果appId为空
      !(appId) ||
      // 如果mchId为空
      !(mchId) ||
      // 如果mchKey为空
      !(mchKey) ||
      // 如果keyPath为空
      !(keyPath)
    ) {
      // 返回false表示配置失败
      return false;
    }

    // 判断appId长度是否在有效范围内
    if (appId?.length < 14 || appId?.length > 22) {
      // 返回false表示配置失败
      return false;
    }

    // 判断mchId长度是否在有效范围内
    if (mchId?.length < 6 || mchId?.length > 14) {
      // 返回false表示配置失败
      return false;
    }

    // 判断mchKey长度是否在有效范围内
    return mchKey?.length >= 30 || mchKey?.length <= 34;
  }
  /**
   * 配置支付宝支付信息
   * @param appId - 支付宝应用ID
   * @param merchantPrivateKey - 商户私钥
   * @param merchantCertPath - 商户证书路径
   * @returns Promise<boolean> - 返回配置是否成功
   */
  public async confAlipay(
    appId: string,
    merchantPrivateKey: string,
    merchantCertPath: string
  ): Promise<boolean> {
    // 记录日志：判断是否已配置完整的支付宝支付信息
    this?.logger?.info?.('判断是否已配置完整的支付宝支付信息');

    // 判断配置信息是否完整
    return !(
      // 如果appId为空
      !(appId) ||
      // 如果merchantPrivateKey为空
      !(merchantPrivateKey) ||
      // 如果merchantCertPath为空
      !(merchantCertPath)
    );
  }
  /**
   * 获取店铺的支付配置信息
   * @param id - 店铺ID
   * @returns Promise<void> - 无返回值
   * @description mall是商城，下面会有多个shop，mall和shop都保存有商户的收款信息，有两种情况会从mall读取收款配置信息，1是卖家向商城付款，2是卖家没有自己的收款账户，钱先打进商城的收款账户，然后再转给卖家
   */
  public async getPayConfig(id: string): Promise<void> { }
  /**
   * 用户登录
   * @param usernamePasswordToken - 包含用户名和密码的对象
   * @returns Promise<Shop> - 返回登录成功的店铺信息
   */
  public async login(usernamePasswordToken: any): Promise<Shop> {
    // 返回null表示登录失败
    return null;
  }

  /**
   * 上传微信支付密钥文件
   * @param map - 包含文件内容的对象
   * @param fileName - 文件名
   * @param fileType - 文件类型
   * @param shopId - 店铺ID
   * @returns Promise<void> - 无返回值
   */
  public async wxpayKeyFileUpload(
    map: any,
    fileName: string,
    fileType: string,
    shopId = ''
  ): Promise<void> { }

  /**
   * 上传支付宝商户证书文件
   * @param map - 包含文件内容的对象
   * @param fileName - 文件名
   * @param fileType - 文件类型
   * @param shopId - 店铺ID
   * @returns Promise<void> - 无返回值
   */
  public async alipayMerchantCertFileUpload(
    map: any,
    fileName: string,
    fileType: string,
    shopId = ''
  ): Promise<void> { }

  /**
   * 更新店铺的微信支付配置
   * @param shopId - 店铺ID
   * @param appIdWxpay - 微信支付的应用ID
   * @param mchId - 微信支付的商户ID
   * @param mchKey - 微信支付的商户密钥
   * @returns Promise<void> - 无返回值
   */
  public async updateWxPayConfig(
    shopId = '',
    appIdWxpay: string,
    mchId: string,
    mchKey: string
  ): Promise<void> { }
  /**
   * 更新店铺的支付宝支付配置
   * @param shopId - 店铺ID
   * @param appIdAlipay - 支付宝支付的应用ID
   * @param merchantPrivateKey - 支付宝支付的商户私钥
   * @returns Promise<void> - 无返回值
   */
  public async updateAlipayConfig(
    shopId = '',
    appIdAlipay: string,
    merchantPrivateKey: string
  ): Promise<void> { }
  /**
   * 更新店铺的许可证信息
   * @param obj - 包含许可证信息的对象
   * @returns Promise<void> - 无返回值
   */
  public async updateLicense(obj: any): Promise<void> { }

  /**
   * 上传图片到本地多媒体素材库并持久化到数据库
   * @returns Promise<void> - 无返回值
   */
  public async imgUpload(): Promise<void> { }

  /**
   * 上传文件到本地多媒体素材库并持久化到数据库
   * @returns Promise<void> - 无返回值
   */
  public async uploadFile(): Promise<void> {
    // 新增本地多媒体素材持久化到数据库中,操作方式:同步
  }
  /**
   * 根据文件ID删除图片
   * @param fileId - 图片文件ID
   * @returns Promise<void> - 无返回值
   */
  public async imgDel(fileId: string): Promise<void> { }

  /**
   * 将店铺与用户进行绑定
   * @param shopSellerMap - 包含店铺与用户绑定信息的对象
   * @returns Promise<void> - 无返回值
   */
  public async bindUser(shopSellerMap: any): Promise<void> { }

  /**
   * 查询指定店铺支持的配送方式
   * @param shopId - 店铺ID
   * @returns Promise<any> - 返回支持的配送方式信息
   */
  public async supportedShippingmethods(shopId = ''): Promise<any> {
    // 标识符名称来自微信小商店

    this?.logger?.info?.('查询配送方式');

    // supported_shipping_methods.express		是否开启快递配送
    // supported_shipping_methods.same_city		是否开启同城配送
    // supported_shipping_methods.pickup	是否开启线下自提
  }
}
