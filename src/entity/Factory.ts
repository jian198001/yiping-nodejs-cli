/**
 * 生产厂家实体类
 */
import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 生产厂家实体类，继承自 BaseModel
 */
@Entity()
export class Factory extends BaseModel {
  /**
   * 厂址，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '', name: 'factory_site' })
  @ApiProperty({ description: '厂址,标识符名称来自淘宝开放平台' })
  public factorySite: string;

  /**
   * 厂家联系方式，标识符名称来自淘宝开放平台
   */
  @Column({ nullable: true, comment: '' })
  @ApiProperty({ description: '厂家联系方式,标识符名称来自淘宝开放平台' })
  public contact: string;
}
