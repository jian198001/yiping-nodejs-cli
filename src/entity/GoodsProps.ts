import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品属性实体类
 * 用于表示商品的属性信息
 */
@Entity()
export class GoodsProps extends BaseModel {

  /**
   * 商品ID
   * 关联的商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

  /**
   * 属性类型
   * 商品属性的类型，可选值包括：id_no（身份证）、text、tel、date、time、email等
   */
  @Column({nullable: true, comment: '', name: 'type',})
  @ApiProperty({description: '类型,可选: id_no（身份证）, text, tel, date, time, email',})
  public type: string  

  /**
   * 属性值
   * 商品属性的具体值
   */
  @Column({nullable: true, comment: '', name: 'value',})
  @ApiProperty({description: '值',})
  public value: string  

  /**
   * 属性名称
   * 商品属性的名称
   */
  @Column({nullable: true, comment: '', name: 'name',})
  @ApiProperty({description: '名称',})
  public name: string  

  /**
   * 属性标签
   * 商品属性的标签，用于展示或分类
   */
  @Column({nullable: true, comment: '', name: 'label',})
  @ApiProperty({description: '标签',})
  public label: string  

  /**
   * 是否必填
   * 商品属性是否必填，1表示是，0表示否
   */
  @Column({nullable: true, comment: '', name: 'required',})
  @ApiProperty({description: '是否必填,1:是,0:否',})
  public required: string  

  /**
   * 默认值
   * 商品属性的默认值
   */
  @Column({nullable: true, comment: '', name: 'default_value',})
  @ApiProperty({description: '默认值',})
  public defaultValue: string  

}
