import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 店铺买家实体类
 * 继承自BaseModel，包含店铺买家相关的各种信息
 */
@Entity()
export class ShopBuyer extends BaseModel {

  /**
   * 余额
   * 对应店铺买家的账户余额
   */
  @Column({nullable: true, comment: '', name: 'balance', type: 'double',})
  @ApiProperty({description: '余额',})
  public balance: number  

  /**
   * 积分
   * 对应店铺买家的积分
   */
  @Column({nullable: true, comment: '', name: 'bonus', type: 'integer',})
  @ApiProperty({description: '积分',})
  public bonus: number  

  /**
   * 保证金-解冻
   * 对应店铺买家已解冻的保证金金额
   */
  @Column({nullable: true, comment: '', name: 'freeze_amount_free', type: 'double',})
  @ApiProperty({description: '保证金-解冻',})
  public freezeAmountFree: number  

  /**
   * 会员卡号
   * 对应店铺买家的会员卡号
   */
  @Column({nullable: true, comment: '', name: 'code',})
  @ApiProperty({description: '会员卡号',})
  public code: string  

  /**
   * 店铺ID
   * 对应店铺买家所属店铺的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 买家ID
   * 对应店铺买家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'buyer_id',})
  public buyerId: string  

  /**
   * 保证金-已冻结
   * 对应店铺买家已冻结的保证金金额
   */
  @Column({nullable: true, comment: '', name: 'freeze_amount_freezing', type: 'double',})
  @ApiProperty({description: '保证金-已冻结',})
  public freezeAmountFreezing: number  

  /**
   * 场景
   * 对应店铺买家的场景信息
   */
  @Column({nullable: true, comment: '', name: 'scene',})
  @ApiProperty({description: '场景',})
  public scene: string  

  /**
   * 卖家来控制买家自己是否可以修改自己的相关信息
   * 卖家控制买家是否可以修改自己的相关信息，默认为'0'
   */
  @Column({nullable: true, comment: '', name: 'readonly',})
  @ApiProperty({description: '卖家来控制买家自己是否可以修改自己的相关信息',})
  public readonly: string = '0';

  /**
   * 用户角色
   * 对应店铺买家的用户角色
   */
  @Column({nullable: true, comment: '', name: 'user_role',})
  public userRole: string  

  /**
   * 小程序分销转介绍场景二维码
   * 对应小程序分销转介绍场景的二维码图片链接
   */
  @Column({nullable: true, comment: '小程序分销转介绍场景二维码', type: 'text', })
  public img: string 

  /**
   * 转介绍人id
   * 对应店铺买家的转介绍人的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'parent_id',})
  @ApiProperty({description: '转介绍人id',})
  public parentId: string  

}
