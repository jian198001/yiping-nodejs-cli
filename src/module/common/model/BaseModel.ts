import { ApiProperty } from '@midwayjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

/**
 * 基础模型类，包含通用的字段和属性
 */
export abstract class BaseModel {
  /**
   * 主键，使用UUID生成
   */
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  /**
   * 名称，可为空
   */
  @Column({ nullable: true, comment: '名称' })
  public name: string;

  /**
   * 排序字段，可为空，默认值为0
   */
  @Column({
    nullable: true,
    comment: '排序',
    name: 'order_num',
    type: 'integer',
  })
  @ApiProperty({ description: '排序' })
  public orderNum: number = 0;
 
  /**
   * 创建日期，默认为当前日期
   */
  @CreateDateColumn({ name: 'create_date', type: 'datetime' })
  public createDate: any = new Date();

  /**
   * 更新日期，默认为当前日期
   */
  @UpdateDateColumn({ name: 'update_date', type: 'datetime' })
  public updateDate: any = new Date();

  /**
   * 版本号，默认为0
   */
  @VersionColumn({ type: 'integer' })
  public version: number = 0;

  /**
   * 删除日期，默认为空
   */
  @DeleteDateColumn({ name: 'delete_date', type: 'datetime' })
  public deleteDate: any = null;
}
