import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class GoodsProps extends BaseModel {

  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

  @Column({nullable: true, comment: '', name: 'type',})
  @ApiProperty({description: '类型,可选: id_no（身份证）, text, tel, date, time, email',})
  public type: string  

  @Column({nullable: true, comment: '', name: 'value',})
  public value: string  

}
