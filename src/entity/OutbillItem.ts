import {Column, Entity,} from "typeorm";
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 出库单商品项实体类
 * 用于表示出库单中的商品项信息
 */
@Entity()
export class OutbillItem extends BaseModel {
  /**
   * 商品数量
   * 该商品项的数量
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
   * 出库单ID
   * 该商品项所属的出库单ID
   */
  @Column({nullable: true, comment: '', name: 'bill_id',})
  public billId: string;
}
