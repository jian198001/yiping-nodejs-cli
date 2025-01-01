import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 商品分类实体类，继承自 BaseModel
 */
@Entity()
export class GoodsCategory extends BaseModel {
  /**
   * 上级分类的编号：0表示一级分类
   */
  @Column({ nullable: true, comment: '', name: 'parent_id' })
  @ApiProperty({ description: '上级分类的编号：0表示一级分类' })
  public parentId: string;

  /**
   * 分类级别：0->1级；1->2级
   */
  @Column({ nullable: true, comment: '', name: 'level', type: 'integer' })
  @ApiProperty({ description: '分类级别：0->1级；1->2级' })
  public level: number;

  /**
   * 商家ID
   */
  @Column({ nullable: true, comment: '', name: 'shop_id' })
  @ApiProperty({ description: '商家ID' })
  public shopId: string;

  /**
   * 商品分类代码
   */
  @Column({ nullable: true, comment: '' })
  public code: string;
}
