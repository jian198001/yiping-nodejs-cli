import { ApiProperty } from "@midwayjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseModel } from "../module/common/model/BaseModel";

/**
 * 配送模板区域设置实体类
 * 
 * 该类用于定义配送模板区域设置的基本信息，包括是否为默认、区域名称、起步标准、加价费用、区域ID、父级ID、加价标准、店铺ID、计价方式和起步费用。
 * 所有标识符名称均来自支付宝。
 */
@Entity()
export class DeliveryTemplateLocale extends BaseModel {

  /**
   * 是否为默认
   * 
   * 表示该配送模板区域设置是否为默认设置。
   */
  @Column({ nullable: true, comment: '', name: 'default_status' })
  @ApiProperty({ description: '是否为默认' })
  public defaultStatus: number;

  /**
   * 区域名称
   * 
   * 表示该配送模板区域设置所对应的区域名称。
   */
  @Column({ nullable: true, comment: '', name: 'area_names' })
  public areaNames: string;

  /**
   * 起步标准
   * 
   * 表示该配送模板区域设置的起步标准，例如重量、体积等。
   */
  @Column({ nullable: true, comment: '', name: 'start_standards', type: 'double' })
  public startStandards: number;

  /**
   * 加价费用
   * 
   * 表示该配送模板区域设置的加价费用。
   */
  @Column({ nullable: true, comment: '', name: 'add_fees', type: 'double' })
  public addFees: number;

  /**
   * 区域ID
   * 
   * 表示该配送模板区域设置所对应的区域ID。
   */
  @Column({ nullable: true, comment: '', name: 'area_ids' })
  public areaIds: string;

  /**
   * 父级ID
   * 
   * 表示该配送模板区域设置的父级ID。
   */
  @Column({ nullable: true, comment: '', name: 'parent_id' })
  public parentId: string;

  /**
   * 加价标准
   * 
   * 表示该配送模板区域设置的加价标准，例如每增加一定重量或体积的加价费用。
   */
  @Column({ nullable: true, comment: '', name: 'add_standards', type: 'double' })
  public addStandards: number;

  /**
   * 店铺ID
   * 
   * 表示该配送模板区域设置所对应的店铺ID。
   */
  @Column({ nullable: true, comment: '', name: 'shop_id' })
  public shopId: string;

  /**
   * 计价方式
   * 
   * 表示该配送模板区域设置的计价方式，例如按重量、体积或件数计价。
   */
  @Column({ nullable: true, comment: '', name: 'valuation' })
  public valuation: string;

  /**
   * 起步费用
   * 
   * 表示该配送模板区域设置的起步费用。
   */
  @Column({ nullable: true, comment: '', name: 'start_fees', type: 'double' })
  public startFees: number;

}
