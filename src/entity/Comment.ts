import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 评价实体类
 * 
 * 该类用于定义用户对订单的评价信息，包括评价内容、评价结果、订单ID、是否匿名和买家ID。
 * 所有标识符名称均来自淘宝开放平台。
 */
@Entity()
export class Comment extends BaseModel {

  /**
   * 评价内容
   * 
   * 评价的具体内容，最大长度为500个汉字。当评价结果为good时，评价内容可为空；当评价结果为neutral或bad时，评价内容必填。
   */
  @Column({nullable: true, comment: '评价内容', name: 'content',})
  @ApiProperty({description: '评价内容,最大长度: 500个汉字 .注意：当评价结果为good时就不用输入评价内容.评价内容为neutral/bad的时候需要输入评价内容。标识符名称来自淘宝开放平台',})
  public content: string  

  /**
   * 评价结果
   * 
   * 评价的结果，可选值为good（好评）、neutral（中评）或bad（差评）。
   */
  @Column({nullable: true, comment: '评价结果', name: 'result',})
  @ApiProperty({description: '评价结果,可选值:good(好评),neutral(中评),bad(差评)。标识符名称来自淘宝开放平台',})
  public result: string  

  /**
   * 订单ID
   * 
   * 被评价订单的唯一标识符。
   */
  @Column({nullable: true, comment: '订单id', name: 'order_id',})
  @ApiProperty({description: '订单id',})
  public orderId: string  

  /**
   * 是否匿名
   * 
   * 评价是否匿名，卖家评不能匿名。可选值为1（匿名）或0（非匿名）。如果交易订单匿名，则评价也匿名。
   */
  @Column({nullable: true, comment: '是否匿名', name: 'anony',})
  @ApiProperty({description: '是否匿名,卖家评不能匿名。可选值:1(匿名),0(非匿名)。注意：如果交易订单匿名,则评价也匿名。标识符名称来自淘宝开放平台',})
  public anony: string  

  /**
   * 买家ID
   * 
   * 评价买家的唯一标识符。
   */
  @Column({nullable: true, comment: '买家id', name: 'shop_shop_buyer_id',})
  @ApiProperty({description: '买家id',})
  public shopBuyerId: string  

}
