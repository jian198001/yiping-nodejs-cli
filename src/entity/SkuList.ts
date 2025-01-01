import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品SKU列表实体类
 * 继承自BaseModel，用于存储商品的SKU列表信息
 */
@Entity()
export class SkuList extends BaseModel {

  /**
   * 价格
   * 对应商品SKU的价格
   */
  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '价格',})
  public price: number  

  /**
   * 商品ID
   * 对应商品SKU所属商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  @ApiProperty({description: '商品ID',})
  public goodsId: string  

  /**
   * 规格值组合
   * 对应商品SKU的多个规格值组合，使用JSON数组保存
   */
  @Column({nullable: true, comment: '', name: 'list',})
  @ApiProperty({description: '多个规格值组合,用JSON数组保存',})
  public list: string  

  /**
   * 默认SKU规格价格信息
   * 对应商品的默认SKU规格价格信息
   */
  @Column({nullable: true, comment: '', name: 'initial_sku',})
  @ApiProperty({description: '多规格商品的默认SKU规格价格信息',})
  public initialSku: string  

  /**
   * 库存数量
   * 对应商品SKU的库存数量
   */
  @Column({nullable: true, comment: '', name: 'stock_num', type: 'double',})
  @ApiProperty({description: '库存',})
  public stockNum: number  

}
