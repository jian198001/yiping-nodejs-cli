import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Consume extends BaseModel { // 物料领用记录

  @Column({nullable: true, comment: '', name: 'staff_id', })
  public staffId: string  

  @Column({nullable: true, comment: '', name: 'material_id', })
  public materialId: string  

  @Column({nullable: true, comment: '', type: 'double',})
  @ApiProperty({description: '购买数量,标识符名称来自支付宝',})
  public quantity: number = 1 

}
