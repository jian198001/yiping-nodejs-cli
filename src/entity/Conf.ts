import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Conf extends BaseModel {

  @Column({nullable: true, comment: '', name: 'conf_key',})
  @ApiProperty({description: '',})
  public confKey: string  

  @Column({nullable: true, name: 'conf_val',})
  @ApiProperty({description: '',})
  public confVal: string  

  @Column({nullable: true, name: '',})
  @ApiProperty({description: '',})
  public category: string  
   
  @Column({nullable: true, name: '',})
  @ApiProperty({description: '',})
  public type: string  
  
  @Column({nullable: true, name: '',})
  @ApiProperty({description: '',})
  public visible: string  
  
  @Column({nullable: true, name: '',})
  @ApiProperty({description: '',})
  public remark: string  

}
