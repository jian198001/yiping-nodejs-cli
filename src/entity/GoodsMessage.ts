import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 商品留言实体类，继承自 BaseModel
 */
@Entity()
export class GoodsMessage extends BaseModel {
  /**
   * 留言类型为 text 时，是否多行文本。'1' 表示多行
   */
  @Column({ nullable: true, comment: '', name: 'multiple' })
  @ApiProperty({ description: '留言类型为 text 时,是否多行文本。\'1\' 表示多行' })
  public multiple: string;

  /**
   * 留言类型为 time 时，是否含日期。'1' 表示包含
   */
  @Column({ nullable: true, comment: '', name: 'datetime' })
  @ApiProperty({ description: '留言类型为 time 时,是否含日期。\'1\' 表示包含' })
  public datetime: string;

  /**
   * 是否必填 '1' 表示必填
   */
  @Column({ nullable: true, comment: '', name: 'placeholder' })
  @ApiProperty({ description: '是否必填 \'1\' 表示必填' })
  public placeholder: string;

  /**
   * 留言类型，可选: id_no（身份证）, text, tel, date, time, email
   */
  @Column({ nullable: true, comment: '', name: 'type' })
  @ApiProperty({ description: '留言类型,可选: id_no（身份证）, text, tel, date, time, email' })
  public type: string;

  /**
   * 是否必填 '1' 表示必填
   */
  @Column({ nullable: true, comment: '', name: 'required' })
  @ApiProperty({ description: '是否必填 \'1\' 表示必填' })
  public required: string;

  /**
   * 商品ID
   */
  @Column({ nullable: true, comment: '', name: 'goods_id' })
  @ApiProperty({ description: '商品ID' })
  public goodsId: string;
}
