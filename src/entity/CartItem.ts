import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class CartItem extends BaseModel {

  @Column({nullable: true, comment: '是否已选', })
  public check: string  

  @Column({nullable: true, comment: '', name: 'property_price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格',})
  public propertyPrice: number  

  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  @ApiProperty({description: '添加到购物车的价格,标识符名称来自支付宝',})
  public price: number  

  @Column({nullable: true, comment: '商品id,标识符名称来自支付宝', name: 'goods_id',})
  public goodsId: string  

  @Column({nullable: true, comment: '', name: 'img',})
  @ApiProperty({description: '商品主图',})
  public img: string  

  @Column({nullable: true, comment: '', name: 'sku_list',})
  public skuList: string  

  @Column({nullable: true, comment: '', name: 'sku_list_cn',})
  public skuListCn: string  

  @Column({nullable: true, comment: '', type: 'double',})
  @ApiProperty({description: '购买数量,标识符名称来自支付宝',})
  public quantity: number = 1 

  @Column({nullable: true, comment: '', name: 'goods_name',})
  @ApiProperty({description: '商品名称,标识符名称来自支付宝',})
  public goodsName: string  

  @Column({nullable: true, comment: '', name: 'goods_sn',})
  public goodsSn: string  

  @Column({nullable: true, comment: '', name: 'goods_sku_code',})
  @ApiProperty({description: '商品sku条码',})
  public goodsSkuCode: string  

  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'cart_messages',})
  public cartMessages: string  

  @Column({nullable: true, comment: '', name: 'messages',})
  public messages: string  

  @Column({nullable: true, comment: '', name: 'goods_sku_id',})
  public goodsSkuId: string  

  @Column({nullable: true, comment: '', name: 'properties',})
  public properties: string  

}
