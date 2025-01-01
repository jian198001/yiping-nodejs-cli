import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class PurchaseOrderItem extends BaseModel {

  @Column({nullable: true, comment: '', name: 'buyer_nickname',})
  @ApiProperty({description: '会员昵称',})
  public buyerNickname: string  

  @Column({nullable: true, comment: '', name: 'material_brand',})
  public materialBrand: string  

  @Column({nullable: true, comment: '', name: 'property_price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格',})
  public propertyPrice: number  

  @Column({nullable: true, comment: '', name: 'quantity', type: 'double',})
  @ApiProperty({description: '购买数量,标识符名称来自支付宝',})
  public quantity: number = 1 

  @Column({nullable: true, comment: '', name: 'sku_list_cn',})
  public skuListCn: string  

  @Column({nullable: true, comment: '', name: 'sku_list',})
  public skuList: string  

  @Column({nullable: true, comment: '', name: 'img',})
  @ApiProperty({description: '物料主图',})
  public img: string  

  @Column({nullable: true, comment: '', name: 'material_category_id',})
  @ApiProperty({description: '物料分类',})
  public materialCategoryId: string  

  @Column({nullable: true, comment: '', name: 'material_id',})
  public materialId: string  

  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格',})
  public price: number  

  @Column({nullable: true, comment: '', name: 'cart_messages',})
  public cartMessages: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'material_sku_code',})
  @ApiProperty({description: '物料sku条码',})
  public materialSkuCode: string  

  @Column({nullable: true, comment: '', name: 'material_sn',})
  public materialSn: string  

  @Column({nullable: true, comment: '', name: 'material_name',})
  @ApiProperty({description: '物料名称',})
  public materialName: string  
 
  @Column({nullable: true, comment: '', name: 'properties',})
  public properties: string  

  @Column({nullable: true, comment: '', name: 'material_sku_id',})
  public materialSkuId: string  
 
  @Column({nullable: true, comment: '', name: 'material_attr',})
  @ApiProperty({description: '物料销售属性:[{\'key\':\'颜色\',\'value\':\'颜色\'},{\'key\':\'容量\',\'value\':\'4G\'}',})
  public materialAttr: string  

  @Column({nullable: true, comment: '', name: 'messages',})
  public messages: string  

  @Column({nullable: true, comment: '', name: 'order_id',})
  @ApiProperty({description: '订单id',})
  public orderId: string  

  @Column({nullable: true, type: 'datetime',})
  @ApiProperty({ description: '失效日期', })
  public exp: any = null

}
