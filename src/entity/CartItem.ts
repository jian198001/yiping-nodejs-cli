import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 购物车项实体类
 * 
 * 该类用于定义购物车中每个商品项的基本信息，包括是否已选、价格、商品ID、商品图片、SKU列表等。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class CartItem extends BaseModel {

  /**
   * 是否已选
   * 
   * 表示该商品项是否已被用户选中。
   */
  @Column({nullable: true, comment: '是否已选', })
  public check: string  

  /**
   * 添加到购物车的价格（propertyPrice）
   * 
   * 表示该商品项添加到购物车时的价格。
   */
  @Column({nullable: true, comment: '', name: 'property_price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格',})
  public propertyPrice: number  

  /**
   * 添加到购物车的价格（price）
   * 
   * 表示该商品项添加到购物车时的价格。
   */
  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格,标识符名称来自支付宝',})
  public price: number  

  /**
   * 商品ID
   * 
   * 表示该商品项对应的商品的唯一标识符。
   */
  @Column({nullable: true, comment: '商品id,标识符名称来自支付宝', name: 'goods_id',})
  public goodsId: string  

  /**
   * 商品主图
   * 
   * 表示该商品项对应的商品的主图。
   */
  @Column({nullable: true, comment: '', name: 'img',})
  @ApiProperty({description: '商品主图',})
  public img: string  

  /**
   * SKU列表
   * 
   * 表示该商品项对应的商品的SKU列表。
   */
  @Column({nullable: true, comment: '', name: 'sku_list',})
  public skuList: string  

  /**
   * SKU列表（中文）
   * 
   * 表示该商品项对应的商品的SKU列表（中文）。
   */
  @Column({nullable: true, comment: '', name: 'sku_list_cn',})
  public skuListCn: string  

  /**
   * 购买数量
   * 
   * 表示该商品项的购买数量。
   */
  @Column({nullable: true, comment: '', type: 'double',})
  @ApiProperty({description: '购买数量,标识符名称来自支付宝',})
  public quantity: number = 1 

  /**
   * 商品名称
   * 
   * 表示该商品项对应的商品的名称。
   */
  @Column({nullable: true, comment: '', name: 'goods_name',})
  @ApiProperty({description: '商品名称,标识符名称来自支付宝',})
  public goodsName: string  

  /**
   * 商品编号
   * 
   * 表示该商品项对应的商品的编号。
   */
  @Column({nullable: true, comment: '', name: 'goods_sn',})
  public goodsSn: string  

  /**
   * 商品SKU条码
   * 
   * 表示该商品项对应的商品的SKU条码。
   */
  @Column({nullable: true, comment: '', name: 'goods_sku_code',})
  @ApiProperty({description: '商品sku条码',})
  public goodsSkuCode: string  

  /**
   * 店铺ID
   * 
   * 表示该商品项对应的店铺的唯一标识符。
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 店铺买家ID
   * 
   * 表示该商品项对应的店铺的买家的唯一标识符。
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  /**
   * 购物车留言
   * 
   * 表示该商品项的购物车留言。
   */
  @Column({nullable: true, comment: '', name: 'cart_messages',})
  public cartMessages: string  

  /**
   * 留言
   * 
   * 表示该商品项的留言。
   */
  @Column({nullable: true, comment: '', name: 'messages',})
  public messages: string  

  /**
   * 商品SKU ID
   * 
   * 表示该商品项对应的商品的SKU的唯一标识符。
   */
  @Column({nullable: true, comment: '', name: 'goods_sku_id',})
  public goodsSkuId: string  

  /**
   * 属性
   * 
   * 表示该商品项的属性。
   */
  @Column({nullable: true, comment: '', name: 'properties',})
  public properties: string  

}
