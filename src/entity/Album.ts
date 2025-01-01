import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 相册实体类
 * 继承自BaseModel，包含相册相关的各种信息
 */
@Entity()
export class Album extends BaseModel { // 相册

  /**
   * 相册描述
   */
  @Column({nullable: true, comment: '', name: 'description',})
  public description: string  

  /**
   * 照片数量
   */
  @Column({nullable: true, comment: '', name: 'pic_count',})
  public picCount: number  

  /**
   * 封面图片
   */
  @Column({nullable: true, comment: '', name: 'cover_pic',})
  public coverPic: string  

}
