import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";
import { ApiProperty } from "@midwayjs/swagger";

/**
 * 移动端模块实体类
 * 用于表示移动端模块的基本信息
 */
@Entity()
export class MobileModule extends BaseModel {

  /**
   * 模块路径
   * 移动端模块的路径
   */
  @Column({nullable: true, comment: '',})
  @ApiProperty({description: '模块路径',})
  public path: string  

  /**
   * 表单ID
   * 关联的表单的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'form_id',})
  @ApiProperty({description: '表单ID',})
  public formId: string  

}
