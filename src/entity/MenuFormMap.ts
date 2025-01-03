import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 菜单表单映射实体类
 * 用于表示菜单与表单之间的映射关系
 */
@Entity()
export class MenuFormMap extends BaseModel {

  /**
   * 菜单ID
   * 关联的菜单的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'menu_id',})
  @ApiProperty({description: '菜单ID ',})
  menuId: string  

  /**
   * 表单ID
   * 关联的表单的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'form_id',})
  @ApiProperty({description: '表单ID ',})
  formId: string  

}
