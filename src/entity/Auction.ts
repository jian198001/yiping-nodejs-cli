import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 拍卖实体类
 * 继承自BaseModel，包含拍卖相关的各种信息
 */
@Entity()
export class Auction extends BaseModel {

  /**
   * 商品ID
   * 对应拍卖商品的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'goods_id',})
  public goodsId: string  

  /**
   * 拍品起拍价
   * 对应拍卖商品的起始价格
   */
  @Column({nullable: true, comment: '', name: 'start_price', type: 'double',})
  @ApiProperty({description: '拍品起拍价,标识符名称来自淘宝开放平台',})
  public startPrice: number  

  /**
   * 拍品底价
   * 对应拍卖商品的底价
   */
  @Column({nullable: true, comment: '', name: 'comp', type: 'double',})
  public comp: number  

  /**
   * 审批状态
   * deny拒绝 permit同意
   */
  @Column({nullable: true, comment: '', name: 'approve',})
  @ApiProperty({description: '审批 deny拒绝 permit同意',})
  public approve: string  

  /**
   * 审批拒绝理由
   */
  @Column({nullable: true, comment: '', name: 'msg',})
  @ApiProperty({description: '审批拒绝理由',})
  public msg: string  

  /**
   * 拍卖活动ID
   * 对应拍卖活动的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'auction_activity_id',})
  public auctionActivityId: string  

  /**
   * 拍卖结束时间
   * 对应拍卖活动的结束时间
   */
  @Column({nullable: true, comment: '', name: 'end_time', type: "datetime",})
  @ApiProperty({description: '拍卖结束时间,标识符名称来自淘宝开放平台',})
  public endTime: any = null; // 拍卖结束时间,标识符名称来自淘宝开放平台

  /**
   * 订单卖家备注
   * 对应订单卖家的备注信息
   */
  @Column({nullable: true, comment: '', name: 'shop_memo',})
  @ApiProperty({description: '订单卖家备注,标识符名称来自淘宝开放平台',})
  public shopMemo: string  

  /**
   * 保留价
   * 对应拍卖商品的保留价格
   */
  @Column({nullable: true, comment: '', name: 'reserve_price', type: 'double',})
  @ApiProperty({description: '保留价,标识符名称来自淘宝开放平台',})
  public reservePrice: number  

  /**
   * 会员最高价
   * 对应会员出价的最高价格
   */
  @Column({nullable: true, comment: '', name: 'max_price', type: 'double',})
  @ApiProperty({description: '会员最高价',})
  public maxPrice: number  

  /**
   * 佣金比例
   * 对应拍卖商品的佣金比例
   */
  @Column({nullable: true, comment: '', name: 'increment_range', type: 'double',})
  @ApiProperty({description: '佣金比例(百分比)，例：123 即1.23%,标识符名称来自淘宝开放平台',})
  public incrementRange: number  

}
