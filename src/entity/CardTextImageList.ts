import {ApiProperty,} from "@midwayjs/swagger"
import {Column,  } from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 卡券图文列表实体类
 * 继承自BaseModel，包含卡券图文相关的各种信息
 */
// @Entity()
export class CardTextImageList extends BaseModel {

  /**
   * 图片链接
   * 对应卡券图文的图片链接，必须调用上传图片接口上传图片获得链接，并在此填入，否则报错
   */
  @Column({nullable: true, comment: '', name: 'image_url',})
  @ApiProperty({description: '图片链接,必须调用 上传图片接口 上传图片获得链接,并在此填入, 否则报错',})
  public imageUrl: string  

  /**
   * 图文描述
   * 对应卡券图文的文字描述
   */
  @Column({nullable: true, comment: '', name: 'text',})
  @ApiProperty({description: '图文描述',})
  public text: string  

}
