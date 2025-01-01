import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 文章实体类
 * 继承自BaseModel，包含文章相关的各种信息
 */
@Entity()
export class Article extends BaseModel {

  /**
   * 文章标题
   * 对应文章的标题
   */
  @Column({nullable: true, comment: '标题',})
  public title: string  

  /**
   * 栏目ID
   * 对应文章所属栏目的唯一标识
   */
  @Column({nullable: true, comment: '栏目id', name: 'category_id',})
  public categoryId: string  

  /**
   * 文章内容
   * 对应文章的详细内容
   */
  @Column({nullable: true, comment: '内容',})
  public content: string  

}
