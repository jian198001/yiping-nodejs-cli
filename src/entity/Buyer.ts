import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm" 
import { User } from "../module/common/model/User";

/**
 * 买家实体类
 * 继承自User，包含买家相关的各种信息
 */
@Entity()
export class Buyer extends User {

  /**
   * 出生日期
   * 对应买家的出生日期
   */
  @Column({nullable: true, comment: '', name: 'birth_date', type: 'datetime',})
  public birthDate: any = null;
 
  /**
   * 性别
   * 对应买家的性别
   */
  @Column({nullable: true, comment: '', name: 'gender',})
  public gender: string  

  /**
   * 昵称
   * 对应买家的昵称
   */
  @Column({nullable: true, comment: '', name: 'nickname',})
  @ApiProperty({description: '昵称',})
  public nickname: string  
 
}
