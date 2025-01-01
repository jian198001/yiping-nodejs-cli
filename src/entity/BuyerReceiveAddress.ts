import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 买家收货地址实体类
 * 继承自BaseModel，包含买家收货地址相关的各种信息
 */
@Entity()
export class BuyerReceiveAddress extends BaseModel {

  /**
   * 地区编码
   * 对应收货地址的地区编码
   */
  @Column({nullable: true, comment: '', name: 'area_code',})
  @ApiProperty({description: '地区编码',})
  public areaCode: string  

  /**
   * 手机号码
   * 对应收货地址的手机号码
   */
  @Column({nullable: true, comment: '', name: 'phone_num',})
  public phoneNum: string  

  /**
   * 买家ID
   * 对应收货地址所属买家的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'buyer_id',})
  public buyerId: string  

  /**
   * 真实姓名
   * 对应收货地址的真实姓名
   */
  @Column({nullable: true, comment: '', name: 'true_name',})
  public trueName: string  

  /**
   * 城市
   * 对应收货地址的城市名称
   */
  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '城市',})
  public city: string  

  /**
   * 区
   * 对应收货地址的区名称
   */
  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '区',})
  public region: string  

  /**
   * 省份/直辖市
   * 对应收货地址的省份或直辖市名称
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string  

  /**
   * 邮政编码
   * 对应收货地址的邮政编码
   */
  @Column({nullable: true, comment: '', name: 'post_code',})
  @ApiProperty({description: '邮政编码',})
  public postCode: string  

  /**
   * 是否为默认地址
   * 0表示不是，1表示是
   */
  @Column({nullable: true, comment: '', name: 'default_status', type: 'integer',})
  @ApiProperty({description: '是否为默认',})
  public defaultStatus: number  

  /**
   * 详细地址
   * 对应收货地址的详细街道及门牌号码
   */
  @Column({nullable: true, comment: '', name: 'detail_address',})
  @ApiProperty({description: '详细地址(街道及门牌号码)',})
  public detailAddress: string  

}
