import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class InbillItem extends BaseModel {
 
  @Column({nullable: true, comment: '数量,标识符名称来自支付宝', type: 'double',})
  public quantity: number = 1 

  @Column({nullable: true, comment: '', name: 'sku_list_cn',})
  public skuListCn: string  

  @Column({nullable: true, comment: '', name: 'sku_list',})
  public skuList: string  

  @Column({nullable: true, comment: '', name: 'img',})
  public img: string  

  @Column({nullable: true, comment: '', name: 'material_category_id',})
  public materialCategoryId: string  

  @Column({nullable: true, comment: '', name: 'material_id',})
  public materialId: string  
 
  @Column({nullable: true, comment: '', name: 'cart_messages',})
  public cartMessages: string  

  @Column({nullable: true, comment: '', name: 'shop_buyer_id',})
  public shopBuyerId: string  

  @Column({nullable: true, comment: '', name: 'material_sku_code',})
  public materialSkuCode: string  

  @Column({nullable: true, comment: '', name: 'material_sn',})
  public materialSn: string  

  @Column({nullable: true, comment: '', name: 'material_name',})
  public materialName: string  
 
  @Column({nullable: true, comment: '', name: 'properties',})
  public properties: string  

  @Column({nullable: true, comment: '', name: 'material_sku_id',})
  public materialSkuId: string  
 
  @Column({nullable: true, comment: '', name: 'material_attr',})
  public materialAttr: string  

  @Column({nullable: true, comment: '', name: 'messages',})
  public messages: string  

  @Column({nullable: true, comment: '', name: 'bill_id',})
  public billId: string  

}
