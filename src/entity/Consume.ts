import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 物料领用记录实体类
 *
 * 该类用于定义物料领用记录的基本信息，包括员工ID、物料ID和购买数量。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class Consume extends BaseModel {
  /**
   * 员工ID
   *
   * 领用物料的员工的唯一标识符。
   */
  @Column({ nullable: true, comment: "员工ID", name: "staff_id" })
  public staffId: string;

  /**
   * 物料ID
   *
   * 被领用物料的唯一标识符。
   */
  @Column({ nullable: true, comment: "物料ID", name: "material_id" })
  public materialId: string;

  /**
   * 购买数量
   *
   * 领用的物料数量。
   */
  @Column({ nullable: true, comment: "购买数量", type: "double" })
  @ApiProperty({ description: "购买数量,标识符名称来自支付宝" })
  public quantity: number = 1;

  /**
   * 物料ID
   *
   * 被领用物料的唯一标识符。
   */
  @Column({ nullable: true, comment: "用途" })
  public purpose: string;
}
