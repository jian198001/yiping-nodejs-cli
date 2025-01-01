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

  public async page(
    query = '', params: string, reqParam: ReqParam, 
    page: Page, 
  ): Promise<any> {
    // 分页列表查询数据

    let whereSql = ' ' // 查询条件字符串

    whereSql += sqlUtils?.like?.(['name'], reqParam?.searchValue, ) // 处理前端的搜索字符串的搜索需求
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

    const obj: any = await super.getByIdBase?.(
      id,
      this?.selectSql,
      this?.fromSql
    );

    obj.confWxpay = true;

    obj.confAlipay = false;

    return obj;
  }

  public async getByCode(code = ''): Promise<Shop> {
    return await this?.repository?.findOneBy?.({ code: code });
  }

  public async del(idsArr: string[]): Promise<void> {
    await this?.repository?.delete?.(idsArr, )
  }

  public async update(
    obj: Shop,
    address: Address = null,
    wxPayConfig: WxPayConfig = null,
    alipayConfig: AlipayConfig = null
  ): Promise<Shop> {
    // 一个表进行操作 typeORM

    let log = '';

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

  public async confWxpay(
    appId: string,
    mchId: string,
    mchKey: string,
    keyPath: string
  ): Promise<boolean> {
    this?.logger?.info?.('判断是否已配置完整的微信支付信息');

    if (
      !(appId) ||
      !(mchId) ||
      !(mchKey) ||
      !(keyPath)
    ) {
      return false;
    }

    if (appId?.length < 14 || appId?.length > 22) {
      return false;
    }

    if (mchId?.length < 6 || mchId?.length > 14) {
      return false;
    }

    return mchKey?.length >= 30 || mchKey?.length <= 34;
  }

  public async confAlipay(
    appId: string,
    merchantPrivateKey: string,
    merchantCertPath: string
  ): Promise<boolean> {
    this?.logger?.info?.('判断是否已配置完整的支付宝支付信息');

    return !(
      !(appId) ||
      !(merchantPrivateKey) ||
      !(merchantCertPath)
    );
  }

  public async getPayConfig(id: string): Promise<void> {
    // mall是商城,下面会有多个shop,mall和shop都保存有商户的收款信息,有两种情况会从mall读取收款配置信息,1是卖家向商城付款,2是卖家没有自己的收款账户，钱先打进商城的收款账户，然后再转给卖家
  }

  public async login(usernamePasswordToken: any): Promise<Shop> {
    return null
  }

  public async wxpayKeyFileUpload(
    map: any,
    fileName: string,
    fileType: string,
    shopId = ''
  ): Promise<void> { }

  public async alipayMerchantCertFileUpload(
    map: any,
    fileName: string,
    fileType: string,
    shopId = ''
  ): Promise<void> { }

  public async updateWxPayConfig(
    shopId = '',
    appIdWxpay: string,
    mchId: string,
    mchKey: string
  ): Promise<void> { }

  public async updateAlipayConfig(
    shopId = '',
    appIdAlipay: string,
    merchantPrivateKey: string
  ): Promise<void> { }

  public async updateLicense(obj: any): Promise<void> { }

  public async imgUpload(): Promise<void> { }

  public async uploadFile(): Promise<void> {
    // 新增本地多媒体素材持久化到数据库中,操作方式:同步h
  }

  public async imgDel(fileId: string): Promise<void> { }

  public async bindUser(shopSellerMap: any): Promise<void> { }

  public async supportedShippingmethods(shopId = ''): Promise<any> {
    // 标识符名称来自微信小商店

    this?.logger?.info?.('查询配送方式');

    // supported_shipping_methods.express		是否开启快递配送
    // supported_shipping_methods.same_city		是否开启同城配送
    // supported_shipping_methods.pickup	是否开启线下自提
  }
}
