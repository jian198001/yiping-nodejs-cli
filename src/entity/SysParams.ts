import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 系统参数实体类
 * 继承自BaseModel，用于存储系统参数的信息
 */
@Entity()
export class SysParams extends BaseModel {

  /**
   * 参数标签
   * 对应系统参数的标签，用于标识参数的用途
   */
  @Column({nullable: true, comment: '', name: 'label',})
  public label: string  

  /**
   * 输入类型
   * 对应系统参数的输入类型，可选值为'text'（字符串）、'number'（浮点数）、'int'（整数）
   */
  @Column({nullable: true, comment: '', name: 'input_type',})
  @ApiProperty({description: 'text:字符串,number:浮点数,int:整数',})
  public inputType: string  

  /**
   * 参数值
   * 对应系统参数的具体值
   */
  @Column({nullable: true, comment: '', name: 'value',})
  public value: string  

}
