import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 线下自提模板实体类
 * 用于表示线下自提的相关模板信息
 */
@Entity()
export class PickupTemplate extends BaseModel { // 线下自提模版 标识符名称来自微信小商店

  /**
   * 营业时间
   * 线下自提的营业时间，默认值为00:00-23:59
   */
  @Column({nullable: true, comment: '', name: 'business_hours',})
  @ApiProperty({description: '营业时间:默认值：00:00-23:59',})
  public businessHours: string  

  /**
   * 备货时间（分钟）
   * 准备商品所需的时间，单位为分钟
   */
  @Column({nullable: true, comment: '', name: 'promise_delivery_minutes',})
  @ApiProperty({description: '备货时间,分钟',})
  public promiseDeliveryMinutes: number  

  /**
   * 可预定时间（分钟）
   * 允许预定的时间范围，单位为分钟
   */
  @Column({nullable: true, comment: '', name: 'book_time',})
  @ApiProperty({description: '可预定时间,分钟',})
  public bookTime: number  

}
