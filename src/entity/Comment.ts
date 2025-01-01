import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class Comment extends BaseModel {

  @Column({nullable: true, comment: '', name: 'content',})
  @ApiProperty({description: '评价内容,最大长度: 500个汉字 .注意：当评价结果为good时就不用输入评价内容.评价内容为neutral/bad的时候需要输入评价内容。标识符名称来自淘宝开放平台',})
  public content: string  

  @Column({nullable: true, comment: '', name: 'result',})
  @ApiProperty({description: '评价结果,可选值:good(好评),neutral(中评),bad(差评)。标识符名称来自淘宝开放平台',})
  public result: string  

  @Column({nullable: true, comment: '', name: 'order_id',})
  @ApiProperty({description: '订单id',})
  public orderId: string  

  @Column({nullable: true, comment: '', name: 'anony',})
  @ApiProperty({description: '是否匿名,卖家评不能匿名。可选值:1(匿名),0(非匿名)。注意：如果交易订单匿名,则评价也匿名。标识符名称来自淘宝开放平台',})
  public anony: string  

  @Column({nullable: true, comment: '', name: 'shop_shop_buyer_id',})
  @ApiProperty({description: '买家id',})
  public shopBuyerId: string  

}
