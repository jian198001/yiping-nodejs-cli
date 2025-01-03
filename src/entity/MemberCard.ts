import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 会员卡实体类
 * 用于表示会员卡的基本信息
 */
@Entity()
export class MemberCard extends BaseModel {

  /**
   * 激活类型
   * 会员卡的激活类型，可选值为use（首次使用时激活）或pay（付款即激活），默认值为use
   */
  @Column({nullable: true, comment: '', name: 'activate_type',})
  @ApiProperty({description: 'use:首次使用时激活,pay:付款即激活',})
  public activateType: string = "use";

  /**
   * 单次最长暂停天数
   * 会员卡单次最长暂停天数
   */
  @Column({nullable: true, comment: '', name: 'max_pause_day', type: 'integer',})
  @ApiProperty({description: '单次最长暂停天数',})
  public maxPauseDay: number  

  /**
   * 背景图片URL
   * 会员卡的背景图片URL
   */
  @Column({nullable: true, comment: '', name: 'background_pic_url',})
  public backgroundPicUrl: string  

  /**
   * 积分规则URL
   * 会员卡的积分规则URL
   */
  @Column({nullable: true, comment: '', name: 'bonus_url',})
  public bonusUrl: string  

  /**
   * 积分规则
   * 会员卡的积分规则
   */
  @Column({nullable: true, comment: '', name: 'bonus_rules',})
  public bonusRules: string  

  /**
   * 激活小程序路径
   * 会员卡激活小程序的路径
   */
  @Column({nullable: true, comment: '', name: 'activate_app_brand_pass',})
  public activateAppBrandPass: string  

  /**
   * 积分是否已清零
   * 会员卡的积分是否已清零
   */
  @Column({nullable: true, comment: '', name: 'bonus_cleared',})
  public bonusCleared: string  

  /**
   * 激活小程序用户名
   * 会员卡激活小程序的用户名
   */
  @Column({nullable: true, comment: '', name: 'activate_app_brand_user_name',})
  public activateAppBrandUserName: string  

  /**
   * 买家角色
   * 会员卡的买家角色，默认值为buyer
   */
  @Column({nullable: true, comment: '', name: 'buyer_role',})
  public buyerRole: string = "buyer";

  /**
   * 商品ID
   * 会员卡关联的商品ID
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  public goodsId: string  

  /**
   * 可核销次数
   * 会员卡的可核销次数
   */
  @Column({nullable: true, comment: '', name: 'consume', type: 'integer',})
  @ApiProperty({description: '可核销次数',})
  public consume: number  

  /**
   * 每月最多核销次数
   * 会员卡每月最多核销次数
   */
  @Column({nullable: true, comment: '', name: 'max_month', type: 'integer',})
  @ApiProperty({description: '每月最多核销次数',})
  public maxMonth: number  

  /**
   * 每天最多核销次数
   * 会员卡每天最多核销次数
   */
  @Column({nullable: true, comment: '', name: 'max_day', type: 'integer',})
  @ApiProperty({description: '每天最多核销次数',})
  public maxDay: number  

  /**
   * 充值余额
   * 会员卡的充值余额
   */
  @Column({nullable: true, comment: '', name: 'supply_balance',})
  public supplyBalance: string  

  /**
   * 充值积分
   * 会员卡的充值积分
   */
  @Column({nullable: true, comment: '', name: 'supply_bonus',})
  public supplyBonus: string  

  /**
   * 特权
   * 会员卡的特权
   */
  @Column({nullable: true, comment: '', name: 'prerogative',})
  public prerogative: string  

  /**
   * 激活URL
   * 会员卡的激活URL
   */
  @Column({nullable: true, comment: '', name: 'activate_url',})
  public activateUrl: string  

  /**
   * 是否自动激活
   * 会员卡是否自动激活
   */
  @Column({nullable: true, comment: '', name: 'auto_activate',})
  public autoActivate: string  

  /**
   * 每周最多核销次数
   * 会员卡每周最多核销次数
   */
  @Column({nullable: true, comment: '', name: 'max_week', type: 'integer',})
  @ApiProperty({description: '每周最多核销次数',})
  public maxWeek: number  

  /**
   * 折扣
   * 会员卡的折扣
   */
  @Column({nullable: true, comment: '', name: 'discount', type: 'integer',})
  public discount: number  

  /**
   * 余额规则
   * 会员卡的余额规则
   */
  @Column({nullable: true, comment: '', name: 'balance_rules',})
  public balanceRules: string  

  /**
   * 余额规则URL
   * 会员卡的余额规则URL
   */
  @Column({nullable: true, comment: '', name: 'balance_url',})
  public balanceUrl: string  

  /**
   * 可暂停次数
   * 会员卡的可暂停次数
   */
  @Column({nullable: true, comment: '', name: 'max_pause', type: 'integer',})
  @ApiProperty({description: '可暂停次数',})
  public maxPause: number  

}
