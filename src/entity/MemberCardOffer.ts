import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {CardOfferBaseInfo,} from "./CardOfferBaseInfo";

@Entity()
export class MemberCardOffer extends CardOfferBaseInfo {

  @Column({nullable: true, comment: '', name: 'max_pause', type: 'integer',})
  @ApiProperty({description: '可暂停次数',})
  public maxPause: number  

  @Column({nullable: true, comment: '', name: 'max_week', type: 'integer',})
  @ApiProperty({description: '每周最多核销次数',})
  public maxWeek: number  

  @Column({nullable: true, comment: '', name: 'auto_activate',})
  public autoActivate: string  

  @Column({nullable: true, comment: '', name: 'discount', type: 'integer',})
  public discount: number  

  @Column({nullable: true, comment: '', name: 'balance_rules',})
  public balanceRules: string  

  @Column({nullable: true, comment: '', name: 'balance_url',})
  public balanceUrl: string  

  @Column({nullable: true, comment: '', name: 'prerogative',})
  public prerogative: string  

  @Column({nullable: true, comment: '', name: 'activate_url',})
  public activateUrl: string  

  @Column({nullable: true, comment: '', name: 'max_month', type: 'integer',})
  @ApiProperty({description: '每月最多核销次数',})
  public maxMonth: number  

  @Column({nullable: true, comment: '', name: 'max_day', type: 'integer',})
  @ApiProperty({description: '每天最多核销次数',})
  public maxDay: number  

  @Column({nullable: true, comment: '', name: 'order_item_id',})
  public orderItemId: string  

  @Column({nullable: true, comment: '', name: 'supply_balance',})
  public supplyBalance: string  

  @Column({nullable: true, comment: '', name: 'supply_bonus',})
  public supplyBonus: string  

  @Column({nullable: true, comment: '', name: 'seller_id',})
  @ApiProperty({description: '销售人员',})
  public sellerId: string  

  @Column({nullable: true, comment: '', name: 'activate_app_brand_user_name',})
  public activateAppBrandUserName: string  

  @Column({nullable: true, comment: '', name: 'member_card_id',})
  public memberCardId: string  

  @Column({nullable: true, comment: '', name: 'buyer_role',})
  public buyerRole: string = 'buyer';

  @Column({nullable: true, comment: '', name: 'consume', type: 'integer',})
  public consume: number  

  @Column({nullable: true, comment: '', name: 'bonus_rules',})
  public bonusRules: string  

  @Column({nullable: true, comment: '', name: 'bonus_url',})
  public bonusUrl: string  

  @Column({nullable: true, comment: '', name: 'bonus_cleared',})
  public bonusCleared: string  

  @Column({nullable: true, comment: '', name: 'activate_app_brand_pass',})
  public activateAppBrandPass: string  

  @Column({nullable: true, comment: '', name: 'activate_type',})
  @ApiProperty({description: 'use:首次使用时激活,pay:付款即激活',})
  public activateType: string = "use";

  @Column({nullable: true, comment: '', name: 'background_pic_url',})
  public backgroundPicUrl: string  

  @Column({nullable: true, comment: '', name: 'max_pause_day', type: 'integer',})
  @ApiProperty({description: '单次最长暂停天数',})
  public maxPauseDay: number  

}
