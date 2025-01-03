import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";
import { ApiProperty } from "@midwayjs/swagger";

/**
 * Google凭证实体类
 * 用于表示Google凭证的基本信息
 */
@Entity()
export class GoogleCredentials extends BaseModel {

  /**
   * 账户名称
   * Google凭证的账户名称
   */
  @Column({nullable: true, comment: '', name: 'account_name',})
  @ApiProperty({description: '账户名称',})
  public accountName: string  

  /**
   * 显示名称
   * Google凭证的显示名称
   */
  @Column({nullable: true, comment: '', name: 'display_name',})
  @ApiProperty({description: '显示名称',})
  public displayName: string  

  /**
   * 邮箱
   * Google凭证的邮箱
   */
  @Column({nullable: true, comment: '', name: 'email',})
  @ApiProperty({description: '邮箱',})
  public email: string  

  /**
   * 姓氏
   * Google凭证的姓氏
   */
  @Column({nullable: true, comment: '', name: 'family_name',})
  @ApiProperty({description: '姓氏',})
  public familyName: string  

  /**
   * 名字
   * Google凭证的名字
   */
  @Column({nullable: true, comment: '', name: 'given_name',})
  @ApiProperty({description: '名字',})
  public givenName: string  

  /**
   * Google ID
   * Google凭证的Google ID
   */
  @Column({nullable: true, comment: '', name: 'google_id',})
  @ApiProperty({description: 'Google ID',})
  public googleId: string  

  /**
   * 照片URL
   * Google凭证的照片URL
   */
  @Column({nullable: true, comment: '', name: 'photo_url',})
  @ApiProperty({description: '照片URL',})
  public photoUrl: string  
  
}
