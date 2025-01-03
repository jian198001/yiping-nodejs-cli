// 导入依赖项
import { ApiProperty } from '@midwayjs/swagger';
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

/**
 * 菜单实体类
 * 用于表示菜单的基本信息
 */
@Entity('Menu')
export class Menu {
  /**
   * 菜单ID
   * 唯一标识一个菜单
   */
  @ObjectIdColumn()
  public id: ObjectId;

  /**
   * 父菜单ID
   * 菜单的父菜单ID
   */
  @prop()
  public pid?: string = '';

  /**
   * 菜单名称
   * 菜单的名称
   */
  @prop()
  public name?: string = '';

  /**
   * 菜单代码
   * 菜单的代码
   */
  @prop()
  public code?: string = '';

  /**
   * 菜单类型
   * 菜单的类型（1目录 2菜单 3按钮）
   */
  @prop()
  @ApiProperty({ description: '类型（1目录 2菜单 3按钮） ' })
  public type?: string = '';

  /**
   * 菜单键
   * 菜单的键
   */
  @prop()
  @ApiProperty({ description: '' })
  public key?: string;

  /**
   * 菜单URL
   * 菜单的URL
   */
  @prop()
  @ApiProperty({ description: '' })
  public url?: string;

  /**
   * 菜单路径
   * 菜单的路径
   */
  @prop()
  @ApiProperty({ description: '' })
  public path?: string;

  /**
   * 父菜单ID
   * 菜单的父菜单ID
   */
  @prop()
  @ApiProperty({ description: '父菜单ID ' })
  public parentId?: string;

  /**
   * 组件路径
   * 菜单的组件路径
   */
  @prop()
  @ApiProperty({ description: '组件路径 ' })
  public component?: string;

  /**
   * 组件名称
   * 菜单的组件名称
   */
  @prop()
  @ApiProperty({ description: '组件路径 ' })
  public componentName?: string;

  /**
   * 路由参数
   * 菜单的路由参数
   */
  @prop()
  @ApiProperty({ description: '路由参数 ' })
  public query?: string;

  /**
   * 是否为外链
   * 菜单是否为外链（0是 1否）
   */
  @prop()
  @ApiProperty({ description: '是否为外链（0是 1否） ' })
  public isFrame?: string;

  /**
   * 是否缓存
   * 菜单是否缓存（选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段）
   */
  @prop()
  @ApiProperty({
    description:
      '选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段',
  })
  public keepAlive?: string;

  /**
   * 是否隐藏
   * 菜单是否隐藏（选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问）
   */
  @prop()
  @ApiProperty({
    description: '选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问',
  })
  public visible?: string;

  /**
   * 是否总是显示
   * 菜单是否总是显示（选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单）
   */
  @prop()
  @ApiProperty({
    description:
      '选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单',
  })
  public alwaysShow?: string;

  /**
   * 菜单状态
   * 菜单的状态（0显示 1隐藏）
   */
  @prop()
  @ApiProperty({ description: '菜单状态（0显示 1隐藏） ' })
  public status?: string;

  /**
   * 权限字符串
   * 菜单的权限字符串
   */
  @prop()
  @ApiProperty({ description: '权限字符串 ' })
  public perms?: string;

  /**
   * 菜单图标
   * 菜单的图标
   */
  @prop()
  @ApiProperty({ description: '菜单图标 ' })
  public icon?: string;

  /**
   * 创建人
   * 菜单的创建人
   */
  @prop()
  @ApiProperty({ description: ' ' })
  public createBy?: string;

  /**
   * 更新人
   * 菜单的更新人
   */
  @prop()
  @ApiProperty({ description: ' ' })
  public updateBy?: string;

  /**
   * 备注
   * 菜单的备注
   */
  @prop()
  @ApiProperty({ description: ' ' })
  public remark?: string;

  /**
   * 菜单层级
   * 菜单的层级
   */
  @prop()
  @ApiProperty({ description: ' ' })
  public level?: number;

  /**
   * 子菜单列表
   * 菜单的子菜单列表
   */
  @Prop(type => Menu)
  public children?: Menu[] = [];
}
