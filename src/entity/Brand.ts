import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 品牌实体类
 * 继承自BaseModel，包含品牌相关的各种信息
 */
@Entity()
export class Brand extends BaseModel {

  /**
   * 专区大图
   * 对应品牌专区的大图
   */
  @Column({nullable: true, comment: '', name: 'big_pic',})
  @ApiProperty({description: '专区大图',})
  public bigPic: string  

  /**
   * 品牌logo
   * 对应品牌的logo图片
   */
  @Column({nullable: true, comment: '', name: 'logo',})
  @ApiProperty({description: '品牌logo',})
  public logo: string  

  /**
   * 品牌故事
   * 对应品牌的故事介绍
   */
  @Column({nullable: true, comment: '', name: 'brand_story',})
  @ApiProperty({description: '品牌故事',})
  public brandStory: string  

  /**
   * 店铺ID
   * 对应品牌所属店铺的唯一标识
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  

  /**
   * 是否为品牌制造商
   * 0表示不是，1表示是
   */
  @Column({nullable: true, comment: '', name: 'factory_status', type: 'integer',})
  @ApiProperty({description: '是否为品牌制造商：0->不是；1->是',})
  public factoryStatus: number  

}
