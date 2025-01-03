import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 邀请码实体类
 * 用于表示邀请码的基本信息
 */
@Entity()
export class InviteCode extends BaseModel { // 邀请码，标识符名称来自淘宝开放平台

  /**
   * 邀请码类型
   * 邀请码的类型，1 - 渠道邀请，2 - 渠道裂变，3 - 会员邀请
   */
  @Column({nullable: true, comment: '', name: 'code_type',})
  @ApiProperty({description: '邀请码类型，1 - 渠道邀请，2 - 渠道裂变，3 - 会员邀请',})
  public codeType: string

  /**
   * 邀请码
   * 邀请码的具体内容
   */
  @Column({nullable: true, comment: '', name: 'invite_code',})
  @ApiProperty({description: '邀请码',})
  public inviteCode: string

  /**
   * 主动邀请的买家ID
   * 主动发起邀请的买家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  @ApiProperty({description: '主动邀请的买家id',})
  public shopBuyerId: string

}
