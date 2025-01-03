import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";
import { ApiProperty } from "@midwayjs/swagger";

/**
 * 多部分文件实体类
 * 用于表示多部分文件的基本信息
 */
@Entity()
export class MultipartFile extends BaseModel {

  /**
   * 文件大小
   * 多部分文件的大小，单位为字节
   */
  @Column({nullable: true, comment: '', name: 'size', type: 'integer',})
  @ApiProperty({description: '文件大小',})
  public size: number  

  /**
   * 原始文件名
   * 多部分文件的原始文件名
   */
  @Column({nullable: true, comment: '', name: 'original_filename',})
  @ApiProperty({description: '原始文件名',})
  public originalFilename: string  

  /**
   * 文件URI
   * 多部分文件的URI
   */
  @Column({nullable: true, comment: '', name: 'uri',})
  @ApiProperty({description: '文件URI',})
  public uri: string  

  /**
   * 外部ID
   * 多部分文件的外部ID
   */
  @Column({nullable: true, comment: '', name: 'ext_id',})
  @ApiProperty({description: '外部ID',})
  public extId: string  

  /**
   * 外部类型
   * 多部分文件的外部类型
   */
  @Column({nullable: true, comment: '', name: 'ext_type',})
  @ApiProperty({description: '外部类型',})
  public extType: string  

  /**
   * 封面图片
   * 多部分文件的封面图片
   */
  @Column({nullable: true, comment: '', name: 'cover',})
  @ApiProperty({description: '封面图片',})
  public cover: string  

  /**
   * 内容类型
   * 多部分文件的内容类型
   */
  @Column({nullable: true, comment: '', name: 'content_type',})
  @ApiProperty({description: '内容类型',})
  public contentType: string  

}
