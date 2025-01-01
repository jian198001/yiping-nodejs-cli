import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class InviteCode extends BaseModel { // 邀请码，标识符名称来自淘宝开放平台

  @Column({nullable: true, comment: '', name: 'code_type',})
  @ApiProperty({description: '邀请码类型，1 - 渠道邀请，2 - 渠道裂变，3 -会员邀请',})
  public codeType: string

  @Column({nullable: true, comment: '', name: 'invite_code',})
  @ApiProperty({description: '邀请码',})
  public inviteCode: string

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  @ApiProperty({description: '主动邀请的买家id',})
  public shopBuyerId: string

}
