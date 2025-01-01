import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 地址实体类
 * 继承自BaseModel，包含商家地址相关的各种信息
 */
@Entity()
export class Address extends BaseModel { // 商家地址 标识符名称来自微信小商店

  /**
   * 是否为发货地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'send_addr',})
  @ApiProperty({description: '是否为发货地址(1是0否),标识符名称来自微信小商店',})
  public sendAddr: string

  /**
   * 是否为默认发货地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'default_send',})
  @ApiProperty({description: '是否为默认发货地址(1是0否),标识符名称来自微信小商店',})
  public defaultSend: string

  /**
   * 是否为收货地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'recv_addr',})
  @ApiProperty({description: '是否为收货地址(1是0否),标识符名称来自微信小商店',})
  public recvAddr: string

  /**
   * 是否为默认收货地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'default_recv',})
  @ApiProperty({description: '是否为默认收货地址(1是0否),标识符名称来自微信小商店',})
  public defaultRecv: string

  /**
   * 是否为同城配送地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'same_city',})
  @ApiProperty({description: '是否为同城配送地址(1是0否),标识符名称来自微信小商店',})
  public sameCity: string

  /**
   * 是否为线下自提地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'pickup',})
  @ApiProperty({description: '是否为线下自提地址(1是0否),标识符名称来自微信小商店',})
  public pickup: string

  /**
   * 经度
   */
  @Column({nullable: true, comment: '', name: 'lat',})
  @ApiProperty({description: '经度,标识符名称来自微信小商店',})
  public lat: string

  /**
   * 纬度
   */
  @Column({nullable: true, comment: '', name: 'lng',})
  @ApiProperty({description: '纬度,标识符名称来自微信小商店',})
  public lng: string

  /**
   * 地区编码
   */
  @Column({nullable: true, comment: '', name: 'area_code',})
  @ApiProperty({description: '地区编码',})
  public areaCode: string

  /**
   * 电话号码
   */
  @Column({nullable: true, comment: '', name: 'phone_num',})
  public phoneNum: string

  /**
   * 店铺ID
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string

  /**
   * 真实姓名
   */
  @Column({nullable: true, comment: '', name: 'true_name',})
  public trueName: string

  /**
   * 城市
   */
  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '城市',})
  public city: string

  /**
   * 区
   */
  @Column({nullable: true, comment: '', name: 'region',})
  @ApiProperty({description: '区',})
  public region: string

  /**
   * 省份/直辖市
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '省份/直辖市',})
  public province: string

  /**
   * 邮政编码
   */
  @Column({nullable: true, comment: '', name: 'post_code',})
  @ApiProperty({description: '邮政编码',})
  public postCode: string

  /**
   * 是否为默认地址
   * 1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'default_status', type: 'integer',})
  @ApiProperty({description: '是否为默认',})
  public defaultStatus: number

  /**
   * 详细地址（街道）
   */
  @Column({nullable: true, comment: '', name: 'detail_address',})
  @ApiProperty({description: '详细地址(街道)',})
  public detailAddress: string

}
