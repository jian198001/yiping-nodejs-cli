import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 库存实体类
 * 用于表示库存的基本信息
 */
@Entity()
export class Inventory extends BaseModel {
  /**
   * 库存数量
   * 库存中商品的数量，默认值为1，标识符名称来自支付宝
   */
  @Column({nullable: true, comment: '数量,标识符名称来自支付宝', name: 'quantity', type: 'double',})
  public quantity: number = 1;

  /**
   * 商品SKU列表（中文）
   * 商品SKU的中文描述列表
   */
  @Column({nullable: true, comment: '', name: 'sku_list_cn',})
  public skuListCn: string;

  /**
   * 商品SKU列表
   * 商品SKU的描述列表
   */
  @Column({nullable: true, comment: '', name: 'sku_list',})
  public skuList: string;

  /**
   * 商品图片
   * 商品的图片URL
   */
  @Column({nullable: true, comment: '', name: 'img',})
  public img: string;

  /**
   * 商品分类ID
   * 商品所属的分类ID
   */
  @Column({nullable: true, comment: '', name: 'material_category_id',})
  public materialCategoryId: string;

  /**
   * 商品ID
   * 商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'material_id',})
  public materialId: string;

  /**
   * 购物车留言
   * 买家在购物车中对商品的留言
   */
  @Column({nullable: true, comment: '', name: 'cart_messages',})
  public cartMessages: string;

  /**
   * 店铺买家ID
   * 购买该商品的店铺买家ID
   */
  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string;

  /**
   * 商品SKU条码
   * 商品SKU的条码
   */
  @Column({nullable: true, comment: '', name: 'material_sku_code',})
  public materialSkuCode: string;

  /**
   * 商品编号
   * 商品的编号
   */
  @Column({nullable: true, comment: '', name: 'material_sn',})
  public materialSn: string;

  /**
   * 商品名称
   * 商品的名称
   */
  @Column({nullable: true, comment: '', name: 'material_name',})
  public materialName: string;

  /**
   * 商品属性
   * 商品的属性列表
   */
  @Column({nullable: true, comment: '', name: 'properties',})
  public properties: string;

  /**
   * 商品SKU ID
   * 商品SKU的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'material_sku_id',})
  public materialSkuId: string;

  /**
   * 商品销售属性
   * 商品的销售属性列表
   */
  @Column({nullable: true, comment: '', name: 'material_attr',})
  public materialAttr: string;

  /**
   * 留言
   * 买家对商品的留言
   */
  @Column({nullable: true, comment: '', name: 'messages',})
  public messages: string;

  /**
   * 订单ID
   * 该库存所属的订单ID
   */
  @Column({nullable: true, comment: '', name: 'order_id',})
  public billId: string;
}
