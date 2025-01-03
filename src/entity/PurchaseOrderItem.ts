import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 采购订单项实体类
 * 用于表示采购订单中的商品项信息
 */
@Entity()
export class PurchaseOrderItem extends BaseModel {
  /**
   * 买家昵称
   * 购买该商品的买家昵称
   */
  @Column({ nullable: true, comment: '', name: 'buyer_nickname' })
  @ApiProperty({ description: '会员昵称' })
  public buyerNickname: string;

  /**
   * 商品品牌
   * 商品的品牌名称
   */
  @Column({ nullable: true, comment: '', name: 'material_brand' })
  public materialBrand: string;

  /**
   * 商品属性价格
   * 商品属性对应的价格
   */
  @Column({ nullable: true, comment: '', name: 'property_price', type: 'double' })
  @ApiProperty({ description: '添加到购物车的价格' })
  public propertyPrice: number;

  /**
   * 商品数量
   * 购买该商品的数量
   */
  @Column({ nullable: true, comment: '', name: 'quantity', type: 'double' })
  @ApiProperty({ description: '购买数量,标识符名称来自支付宝' })
  public quantity: number = 1;

  /**
   * 商品SKU列表（中文）
   * 商品SKU的中文描述列表
   */
  @Column({ nullable: true, comment: '', name: 'sku_list_cn' })
  public skuListCn: string;

  /**
   * 商品SKU列表
   * 商品SKU的描述列表
   */
  @Column({ nullable: true, comment: '', name: 'sku_list' })
  public skuList: string;

  /**
   * 商品图片
   * 商品的图片URL
   */
  @Column({ nullable: true, comment: '', name: 'img' })
  @ApiProperty({ description: '物料主图' })
  public img: string;

  /**
   * 商品分类ID
   * 商品所属的分类ID
   */
  @Column({ nullable: true, comment: '', name: 'material_category_id' })
  @ApiProperty({ description: '物料分类' })
  public materialCategoryId: string;

  /**
   * 商品ID
   * 商品的唯一标识
   */
  @Column({ nullable: true, comment: '', name: 'material_id' })
  public materialId: string;

  /**
   * 商品价格
   * 商品的价格
   */
  @Column({ nullable: true, comment: '', name: 'price', type: 'double' })
  @ApiProperty({ description: '添加到购物车的价格' })
  public price: number;

  /**
   * 购物车留言
   * 买家在购物车中对商品的留言
   */
  @Column({ nullable: true, comment: '', name: 'cart_messages' })
  public cartMessages: string;

  /**
   * 店铺买家ID
   * 购买该商品的店铺买家ID
   */
  @Column({ nullable: true, comment: '', name: 'shop_buyer_id' })
  public shopBuyerId: string;

  /**
   * 商品SKU条码
   * 商品SKU的条码
   */
  @Column({ nullable: true, comment: '', name: 'material_sku_code' })
  @ApiProperty({ description: '物料sku条码' })
  public materialSkuCode: string;

  /**
   * 商品编号
   * 商品的编号
   */
  @Column({ nullable: true, comment: '', name: 'material_sn' })
  public materialSn: string;

  /**
   * 商品名称
   * 商品的名称
   */
  @Column({ nullable: true, comment: '', name: 'material_name' })
  @ApiProperty({ description: '物料名称' })
  public materialName: string;

  /**
   * 商品属性
   * 商品的属性列表
   */
  @Column({ nullable: true, comment: '', name: 'properties' })
  public properties: string;

  /**
   * 商品SKU ID
   * 商品SKU的唯一标识
   */
  @Column({ nullable: true, comment: '', name: 'material_sku_id' })
  public materialSkuId: string;

  /**
   * 商品销售属性
   * 商品的销售属性列表
   */
  @Column({ nullable: true, comment: '', name: 'material_attr' })
  @ApiProperty({ description: '物料销售属性:[{\'key\':\'颜色\',\'value\':\'颜色\'},{\'key\':\'容量\',\'value\':\'4G\'}' })
  public materialAttr: string;

  /**
   * 留言
   * 买家对商品的留言
   */
  @Column({ nullable: true, comment: '', name: 'messages' })
  public messages: string;

  /**
   * 订单ID
   * 该商品项所属的订单ID
   */
  @Column({ nullable: true, comment: '', name: 'order_id' })
  @ApiProperty({ description: '订单id' })
  public orderId: string;

  /**
   * 失效日期
   * 商品的失效日期
   */
  @Column({ nullable: true, type: 'datetime' })
  @ApiProperty({ description: '失效日期' })
  public exp: any = null;
}
