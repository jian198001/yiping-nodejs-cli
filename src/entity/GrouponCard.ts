import {ApiProperty,} from "@midwayjs/swagger"
import {Column,  } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 团购卡实体类
 * 用于表示团购卡的基本信息
 */
// @Entity()
export class GrouponCard extends BaseModel {

  /**
   * 领取场景值
   * 用于领取渠道数据统计。可在生成二维码接口及添加Addcard接口中自定义该字段的字符串值。
   */
  @Column({nullable: true, comment: '', name: 'outer_str',})
  @ApiProperty({description: '领取场景值,用于领取渠道数据统计。可在生成二维码接口及添加Addcard接口中自定义该字段的字符串值。',})
  public outerStr: string  

  /**
   * 店铺买家ID
   * 团购卡所属店铺的买家ID
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  /**
   * 好友用户名
   * 当IsGiveByFriend为1时填入的字段,表示发起转赠用户的openid
   */
  @Column({nullable: true, comment: '', name: 'friend_user_name',})
  @ApiProperty({description: '当IsGiveByFriend为1时填入的字段,表示发起转赠用户的openid',})
  public friendUserName: string  

  /**
   * 团购详情
   * 团购券专用,团购详情。
   */
  @Column({nullable: true, comment: '', name: 'deal_detail',})
  @ApiProperty({description: '团购券专用,团购详情。',})
  public dealDetail: string  

  /**
   * 是否恢复会员卡
   * 用户删除会员卡后可重新找回,当用户本次操作为finder时,该值为1,否则为0
   */
  @Column({nullable: true, comment: '', name: 'is_restore_member_card',})
  @ApiProperty({description: '用户删除会员卡后可重新finder,当用户本次操作为finder时,该值为1,否则为0',})
  public isRestoreMemberCard: string  

  /**
   * 是否为转赠领取
   * 是否为转赠领取,1代表是,0代表否。
   */
  @Column({nullable: true, comment: '', name: 'is_give_by_friend',})
  @ApiProperty({description: '是否为转赠领取,1代表是,0代表否。',})
  public isGiveByFriend: string  

  /**
   * 用户卡券状态
   * 当前code对应卡券的状态 NORMAL 正常 CONSUMED 已核销 EXPIRE 已过期 GIFTING 转赠中 GIFT_TIMEOUT 转赠超时 DELETE 已删除 UNAVAILABLE 已失效 code未被添加或被转赠领取的情况则统一报错：invalid serial code
   */
  @Column({nullable: true, comment: '', name: 'user_card_status',})
  @ApiProperty({description: '当前code对应卡券的状态 NORMAL 正常 CONSUMED 已核销 EXPIRE 已过期 GIFTING 转赠中 GIFT_TIMEOUT 转赠超时 DELETE 已删除 UNAVAILABLE 已失效 code未被添加或被转赠领取的情况则统一报错：invalid serial code',})
  public userCardStatus: string  

  /**
   * 用户卡券代码
   * 当前用户的卡券代码
   */
  @Column({nullable: true, comment: '', name: 'user_card_code',})
  public userCardCode: string  

  /**
   * 旧用户卡券代码
   * 为保证安全,微信会在转赠发生后变更该卡券的code号,该字段表示转赠前的code。
   */
  @Column({nullable: true, comment: '', name: 'old_user_card_code',})
  @ApiProperty({description: '为保证安全,微信会在转赠发生后变更该卡券的code号,该字段表示转赠前的code。',})
  public oldUserCardCode: string  

}
