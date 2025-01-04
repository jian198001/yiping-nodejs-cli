import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 快递公司实体类
 * 
 * 该类用于定义快递公司的基本信息，包括快递公司ID和快递公司名称。
 * 所有标识符名称均来自微信小商店。
 */
@Entity()
export class DeliveryCompany extends BaseModel { // 快递公司 标识符名称来自微信小商店

  /**
   * 快递公司ID
   * 
   * 表示快递公司的唯一标识符。
   */
  @Column({ nullable: true, comment: '', name: 'delivery_id' })
  @ApiProperty({ description: '快递公司id' })
  public deliveryId: string;

  /**
   * 快递公司名称
   * 
   * 表示快递公司的名称。
   */
  @Column({ nullable: true, comment: '', name: 'delivery_name' })
  @ApiProperty({ description: '快递公司名称' })
  public deliveryName: string;

}
