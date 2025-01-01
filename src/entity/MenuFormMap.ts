import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class MenuFormMap extends BaseModel {

  @Column({nullable: true, comment: '', name: 'menu_id',})
  @ApiProperty({description: '菜单ID ',})
  menuId: string  

  @Column({nullable: true, comment: '', name: 'form_id',})
  @ApiProperty({description: '表单ID ',})
  formId: string  

}
