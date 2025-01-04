import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 配置项实体类
 * 
 * 该类用于定义系统配置项的基本信息，包括配置项的键、值、类别、类型、可见性和备注。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class Conf extends BaseModel {

  /**
   * 配置项的键
   * 
   * 用于唯一标识一个配置项。
   */
  @Column({ nullable: true, comment: '配置项的键', name: 'conf_key' })
  @ApiProperty({ description: '配置项的键' })
  public confKey: string;

  /**
   * 配置项的值
   * 
   * 配置项的具体取值。
   */
  @Column({ nullable: true, name: 'conf_val' })
  @ApiProperty({ description: '配置项的值' })
  public confVal: string;

  /**
   * 配置项的类别
   * 
   * 用于对配置项进行分类管理。
   */
  @Column({ nullable: true, name: 'category' })
  @ApiProperty({ description: '配置项的类别' })
  public category: string;

  /**
   * 配置项的类型
   * 
   * 用于标识配置项的数据类型。
   */
  @Column({ nullable: true, name: 'type' })
  @ApiProperty({ description: '配置项的类型' })
  public type: string;

  /**
   * 配置项的可见性
   * 
   * 用于控制配置项是否对用户可见。
   */
  @Column({ nullable: true, name: 'visible' })
  @ApiProperty({ description: '配置项的可见性' })
  public visible: string;

  /**
   * 配置项的备注
   * 
   * 用于对配置项进行说明和描述。
   */
  @Column({ nullable: true, name: 'remark' })
  @ApiProperty({ description: '配置项的备注' })
  public remark: string;

}
