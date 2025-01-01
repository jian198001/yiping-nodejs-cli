import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 拍卖活动实体类
 * 继承自BaseModel，包含拍卖活动相关的各种信息
 */
@Entity()
export class AuctionActivity extends BaseModel {

  /**
   * 店铺ID
   * 对应拍卖活动所属店铺的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 拍卖活动标题
   * 对应拍卖活动的标题
   */
  @Column({nullable: true, comment: '', name: 'title',})
  public title: string  

  /**
   * 拍卖开始时间
   * 对应拍卖活动的开始时间
   */
  @Column({nullable: true, comment: '', name: 'start_time', type: "datetime",})
  @ApiProperty({description: '拍卖开始时间,标识符名称来自淘宝开放平台',})
  public startTime: any = null;

  /**
   * 商品类目ID
   * 对应拍卖活动所属商品类目的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_category_id',})
  public goodsCategoryId: string  

}
