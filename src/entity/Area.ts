import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 区域配置实体类
 * 继承自BaseModel，包含区域配置相关的各种信息
 */
@Entity()
export class Area extends BaseModel {

  /**
   * 配置键
   * 对应区域配置的键
   */
  @Column({nullable: true, comment: '', name: 'conf_key',})
  @ApiProperty({description: '',})
  confKey: string  
 
}
