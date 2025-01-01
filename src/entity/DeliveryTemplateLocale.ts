import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class DeliveryTemplateLocale extends BaseModel {

  @Column({nullable: true, comment: '', name: 'default_status',})
  @ApiProperty({description: '是否为默认',})
  public defaultStatus: number  

  @Column({nullable: true, comment: '', name: 'area_names',})
  public areaNames: string  

  @Column({nullable: true, comment: '', name: 'start_standards', type: 'double',})
  public startStandards: number  

  @Column({nullable: true, comment: '', name: 'add_fees', type: 'double',})
  public addFees: number  

  @Column({nullable: true, comment: '', name: 'area_ids',})
  public areaIds: string  

  @Column({nullable: true, comment: '', name: 'parent_id',})
  public parentId: string  

  @Column({nullable: true, comment: '', name: 'add_standards', type: 'double',})
  public addStandards: number  

  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  @Column({nullable: true, comment: '', name: 'valuation',})
  public valuation: string  

  @Column({nullable: true, comment: '', name: 'start_fees', type: 'double',})
  public startFees: number  

}
