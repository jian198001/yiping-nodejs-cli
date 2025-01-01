import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class PickupTemplate extends BaseModel { // 线下自提模版 标识符名称来自微信小商店

  @Column({nullable: true, comment: '', name: 'business_hours',})
  @ApiProperty({description: '营业时间:默认值：00:00-23:59',})
  public businessHours: string  

  @Column({nullable: true, comment: '', name: 'promise_delivery_minutes',})
  @ApiProperty({description: '备货时间,分钟',})
  public promiseDeliveryMinutes: number  

  @Column({nullable: true, comment: '', name: 'book_time',})
  @ApiProperty({description: '可预定时间,分钟',})
  public bookTime: number  

}
