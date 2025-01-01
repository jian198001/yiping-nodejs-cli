import {ApiProperty,} from "@midwayjs/swagger"
import {Column,  } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 卡券基础信息实体类
 * 继承自BaseModel，包含卡券相关的各种基础信息
 */
// @Entity()
export class CardBaseInfo extends BaseModel {

  /**
   * 商户名字
   * 卡券所属商户的名称，字数上限为12个汉字
   */
  @Column({nullable: true, comment: '', name: 'brand_name',})
  @ApiProperty({description: '商户名字,字数上限为12个汉字。',})
  public brandName: string  

  /**
   * 是否指定用户领取
   * 是否限制特定用户领取卡券，true表示指定，false表示不指定，默认为false
   */
  @Column({nullable: true, comment: '', name: 'bind_shop_buyer_id',})
  @ApiProperty({description: '是否指定用户领取,填写true或false 。默认为false。通常指定特殊用户群体 投放卡券或防止刷券时选择指定用户领取。',})
  public bindBuyerId: string  

  /**
   * 是否分享给朋友
   * 卡券是否可以分享给朋友
   */
  @Column({nullable: true, comment: '', name: 'share_friends',})
  public shareFriends: string  

  /**
   * 使用时间的类型
   * 卡券的使用时间类型，可选值为DATE_TYPE_FIX_TIME_RANGE（固定日期区间）或DATE_TYPE_FIX_TERM（固定时长，自领取后按天算），默认为DATE_TYPE_FIX_TERM
   */
  @Column({nullable: true, comment: '', name: 'type',})
  @ApiProperty({description: '使用时间的类型,DATE_TYPE_FIX_TIME_RANGE 表示固定日期区间,DATE_TYPE_FIX_TERM 表示固定时长 （自领取后按天算)。',})
  public type: string = "DATE_TYPE_FIX_TERM";

  /**
   * 购买xx可用类型门槛
   * 卡券使用的购买门槛说明，仅用于兑换券类型，填入后自动拼写购买xxx可用
   */
  @Column({nullable: true, comment: '', name: 'object_use_for',})
  @ApiProperty({description: '购买xx可用类型门槛,仅用于兑换 ,填入后自动拼写购买xxx可用。',})
  public objectUseFor: string  

  /**
   * 客服电话
   * 卡券所属商户的客服电话
   */
  @Column({nullable: true, comment: '', name: 'service_phone',})
  @ApiProperty({description: '客服电话。',})
  public servicePhone: string  
 
  /**
   * 指定不可用的商品类目
   * 卡券不可用的商品类目，仅用于代金券类型，填入后将在券面拼写不适用于xxxx
   */
  @Column({nullable: true, comment: '', name: 'reject_category',})
  @ApiProperty({description: '指定不可用的商品类目,仅用于代金券类型 ,填入后将在券面拼写不适用于xxxx',})
  public rejectCategory: string  

  /**
   * 起用时间
   * type为DATE_TYPE_FIX_TIME_RANGE时专用，表示卡券的起用时间，从1970年1月1日00:00:00至起用时间的秒数，最终需转换为字符串形态传入（东八区时间，UTC+8，单位为秒）
   */
  @Column({nullable: true, comment: '', name: 'begin_timestamp', type: 'integer',})
  @ApiProperty({description: 'type为DATE_TYPE_FIX_TIME_RANGE时专用,表示起用时间。从1970年1月1日00:00:00至起用时间的秒数,最终需转换为字符串形态传入。（东八区时间,UTC+8,单位为秒）',})
  public beginTimestamp: number  

  /**
   * 满减门槛字段
   * 卡券的满减门槛，可用于兑换券和代金券，填入后将在券面拼写消费满xx元可用
   */
  @Column({nullable: true, comment: '', name: 'least_cost', type: 'integer',})
  @ApiProperty({description: '满减门槛字段,可用于兑换券和代金券 ,填入后将在全面拼写消费满xx元可用。',})
  public leastCost: number  

  /**
   * 码型
   * 卡券的码型，可选值为"CODE_TYPE_TEXT"（文本）、"CODE_TYPE_BARCODE"（一维码）、"CODE_TYPE_QRCODE"（二维码）、"CODE_TYPE_ONLY_QRCODE"（二维码无code显示）、"CODE_TYPE_ONLY_BARCODE"（一维码无code显示）、CODE_TYPE_NONE（不显示code和条形码类型），默认为"CODE_TYPE_QRCODE"
   */
  @Column({nullable: true, comment: '', name: 'code_type',})
  @ApiProperty({description: '码型： "CODE_TYPE_TEXT"文 本 ； "CODE_TYPE_BARCODE"一维码 "CODE_TYPE_QRCODE"二维码 "CODE_TYPE_ONLY_QRCODE",二维码无code显示； "CODE_TYPE_ONLY_BARCODE",一维码无code显示；CODE_TYPE_NONE, 不显示code和条形码类型',})
  public codeType: string = "CODE_TYPE_QRCODE";

  /**
   * 自领取后多少天内有效
   * type为DATE_TYPE_FIX_TERM时专用，表示卡券自领取后多少天内有效，不支持填写0
   */
  @Column({nullable: true, comment: '', name: 'fixed_term', type: 'integer',})
  @ApiProperty({description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天内有效,不支持填写0。',})
  public fixedTerm: number  
 
  /**
   * 是否可以与其他类型共享门槛
   * 卡券是否可以与其他类型共享门槛，false表示不可以，true表示可以，默认为true
   */
  @Column({nullable: true, comment: '', name: 'can_use_with_other_discount',})
  @ApiProperty({description: '不可以与其他类型共享门槛 ,填写false时系统将在使用须知里 拼写“不可与其他优惠共享”, 填写true时系统将在使用须知里 拼写“可与其他优惠共享”, 默认为true',})
  public canUseWithOtherDiscount: string  

  /**
   * 是否支付并生成二维码
   * 卡券是否需要支付并生成二维码
   */
  @Column({nullable: true, comment: '', name: 'is_pay_and_qrcode',})
  public isPayAndQrcode: string  

  /**
   * 券颜色
   * 卡券的颜色，按色彩规范标注填写Color010-Color100
   */
  @Column({nullable: true, comment: '', name: 'color',})
  @ApiProperty({description: '券颜色。按色彩规范标注填写Color010-Color100。',})
  public color: string  

  /**
   * 每人可领券的数量限制
   * 每人可领取该卡券的数量限制，不填写默认为50
   */
  @Column({nullable: true, comment: '', name: 'get_limit', type: 'integer',})
  @ApiProperty({description: '每人可领券的数量限制,不填写默认为50。',})
  public getLimit: number  

  /**
   * 卡券使用说明
   * 卡券的使用说明，字数上限为1024个汉字
   */
  @Column({nullable: true, comment: '', name: 'description',})
  @ApiProperty({description: '卡券使用说明,字数上限为1024个汉字。',})
  public description: string  

  /**
   * 卡券领取页面是否可分享
   * 卡券领取页面是否可以分享
   */
  @Column({nullable: true, comment: '', name: 'can_share',})
  @ApiProperty({description: '卡券领取页面是否可分享。',})
  public canShare: string  

  /**
   * 指定可用的商品类目
   * 卡券可用的商品类目，仅用于代金券类型，填入后将在券面拼写适用于xxx
   */
  @Column({nullable: true, comment: '', name: 'accept_category',})
  @ApiProperty({description: '指定可用的商品类目,仅用于代金券类型 ,填入后将在券面拼写适用于xxx',})
  public acceptCategory: string  

  /**
   * 服务场景入口
   */
  @Column({nullable: true, comment: '', name: 'custom_url_name',})
  @ApiProperty({description: '服务场景入口',})
  public customUrlName: string  

  /**
   * 门店位置poiid。 调用 POI门店管理接 口 获取门店位置poiid。具备线下门店 的商户为必填。
   */
  @Column({nullable: true, comment: '', name: 'location_id_list',})
  @ApiProperty({description: '门店位置poiid。 调用 POI门店管理接 口 获取门店位置poiid。具备线下门店 的商户为必填。',})
  public locationIdList: string  

  /**
   * 是否自定义Code码 。填写true或false,默认为false。 通常自有优惠码系统的开发者选择 自定义Code码,并在卡券投放时带入 Code码,详情见 是否自定义Code码 。
   */
  @Column({nullable: true, comment: '', name: 'use_custom_code',})
  @ApiProperty({description: '是否自定义Code码 。填写true或false,默认为false。 通常自有优惠码系统的开发者选择 自定义Code码,并在卡券投放时带入 Code码,详情见 是否自定义Code码 。',})
  public useCustomCode: string  

  /**
   * shop_id
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 设置本卡券支持全部门店,与location_id_list互斥
   */
  @Column({nullable: true, comment: '', name: 'use_all_locations',})
  @ApiProperty({description: '设置本卡券支持全部门店,与location_id_list互斥',})
  public useAllLocations: string  

  /**
   * 表示结束时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ） // 可用于DATE_TYPE_FIX_TERM时间类型,表示卡券统一过期时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ）,设置了fixed_term卡券,当时间达到end_timestamp时卡券统一过期
   */
  @Column({nullable: true, comment: '', name: 'end_timestamp', type: 'integer',})
  @ApiProperty({description: '表示结束时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ） // 可用于DATE_TYPE_FIX_TERM时间类型,表示卡券统一过期时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ）,设置了fixed_term卡券,当时间达到end_timestamp时卡券统一过期',})
  public endTimestamp: number  

  /**
   * 卡券是否可转赠。
   */
  @Column({nullable: true, comment: '', name: 'can_give_friend',})
  @ApiProperty({description: '卡券是否可转赠。',})
  public canGiveFriend: string  

  /**
   * 卡券名,字数上限为9个汉字。(建议涵盖卡券属性、服务及金额(元))。
   */
  @Column({nullable: true, comment: '', name: 'title',})
  @ApiProperty({description: '卡券名,字数上限为9个汉字。(建议涵盖卡券属性、服务及金额(元))。',})
  public title: string  

  /**
   * 卡券使用提醒,字数上限为16个汉字。
   */
  @Column({nullable: true, comment: '', name: 'notice',})
  @ApiProperty({description: '卡券使用提醒,字数上限为16个汉字。',})
  public notice: string  

  /**
   * 商家服务类型： BIZ_SERVICE_DELIVER 外卖服务； BIZ_SERVICE_FREE_PARK 停车位； BIZ_SERVICE_WITH_PET 可带宠物； BIZ_SERVICE_FREE_WIFI 免费wifi, 可多选
   */
  @Column({nullable: true, comment: '', name: 'business_service_list',})
  @ApiProperty({description: '商家服务类型： BIZ_SERVICE_DELIVER 外卖服务； BIZ_SERVICE_FREE_PARK 停车位； BIZ_SERVICE_WITH_PET 可带宠物； BIZ_SERVICE_FREE_WIFI 免费wifi, 可多选',})
  public businessServiceList: string  

  /**
   * 服务场景入口
   */
  @Column({nullable: true, comment: '', name: 'custom_url',})
  @ApiProperty({description: '服务场景入口',})
  public customUrl: string  

  /**
   * 显示在入口下方的提示语 ,仅在卡券状态正常(可以核销)时显示。
   */
  @Column({nullable: true, comment: '', name: 'center_sub_title',})
  @ApiProperty({description: '显示在入口下方的提示语 ,仅在卡券状态正常(可以核销)时显示。',})
  public centerSubTitle: string  

  /**
   * type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天开始生效,领取后当天生效填写0。（单位为天）
   */
  @Column({nullable: true, comment: '', name: 'fixed_begin_term', type: 'integer',})
  @ApiProperty({description: 'type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天开始生效,领取后当天生效填写0。（单位为天）',})
  public fixedBeginTerm: number  

  /**
   * 每人可领券的数量限制,不填写默认为50。
   */
  @Column({nullable: true, comment: '', name: 'use_limit', type: 'integer',})
  @ApiProperty({description: '每人可领券的数量限制,不填写默认为50。',})
  public useLimit: number  

}
