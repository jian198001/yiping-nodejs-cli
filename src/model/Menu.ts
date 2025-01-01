import { ApiProperty } from '@midwayjs/swagger';
import { Prop, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn } from 'typeorm';

@Entity('Menu')
export class Menu {
  @ObjectIdColumn()
  public id: ObjectId;

  @prop()
  public pid?: string = '';

  @prop()
  public name?: string = '';

  @prop()
  public code?: string = '';

  @prop()
  @ApiProperty({ description: '类型（1目录 2菜单 3按钮） ' })
  public type?: string = '';

  @prop()
  @ApiProperty({ description: '' })
  public key?: string;

  @prop()
  @ApiProperty({ description: '' })
  public url?: string;

  @prop()
  @ApiProperty({ description: '' })
  public path?: string;

  @prop()
  @ApiProperty({ description: '父菜单ID ' })
  public parentId?: string;

  @prop()
  @ApiProperty({ description: '组件路径 ' })
  public component?: string;

  @prop()
  @ApiProperty({ description: '组件路径 ' })
  public componentName?: string;

  @prop()
  @ApiProperty({ description: '路由参数 ' })
  public query?: string;

  @prop()
  @ApiProperty({ description: '是否为外链（0是 1否） ' })
  public isFrame?: string;

  @prop()
  @ApiProperty({
    description:
      '选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段',
  })
  public keepAlive?: string;

  @prop()
  @ApiProperty({
    description: '选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问',
  })
  public visible?: string;

  @prop()
  @ApiProperty({
    description:
      '选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单',
  })
  public alwaysShow?: string;

  @prop()
  @ApiProperty({ description: '菜单状态（0显示 1隐藏） ' })
  public status?: string;

  @prop()
  @ApiProperty({ description: '权限字符串 ' })
  public perms?: string;

  @prop()
  @ApiProperty({ description: '菜单图标 ' })
  public icon?: string;

  @prop()
  @ApiProperty({ description: ' ' })
  public createBy?: string;

  @prop()
  @ApiProperty({ description: ' ' })
  public updateBy?: string;

  @prop()
  @ApiProperty({ description: ' ' })
  public remark?: string;

  @prop()
  @ApiProperty({ description: ' ' })
  public level?: number;

  @Prop(type => Menu)
  public children?: Menu[] = [];
}
