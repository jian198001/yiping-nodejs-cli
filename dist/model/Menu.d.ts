import { ObjectId } from 'mongoose';
/**
 * 菜单实体类
 * 用于表示菜单的基本信息
 */
export declare class Menu {
    /**
     * 菜单ID
     * 唯一标识一个菜单
     */
    id: ObjectId;
    /**
     * 父菜单ID
     * 菜单的父菜单ID
     */
    pid?: string;
    /**
     * 菜单名称
     * 菜单的名称
     */
    name?: string;
    /**
     * 菜单代码
     * 菜单的代码
     */
    code?: string;
    /**
     * 菜单类型
     * 菜单的类型（1目录 2菜单 3按钮）
     */
    type?: string;
    /**
     * 菜单键
     * 菜单的键
     */
    key?: string;
    /**
     * 菜单URL
     * 菜单的URL
     */
    url?: string;
    /**
     * 菜单路径
     * 菜单的路径
     */
    path?: string;
    /**
     * 父菜单ID
     * 菜单的父菜单ID
     */
    parentId?: string;
    /**
     * 组件路径
     * 菜单的组件路径
     */
    component?: string;
    /**
     * 组件名称
     * 菜单的组件名称
     */
    componentName?: string;
    /**
     * 路由参数
     * 菜单的路由参数
     */
    query?: string;
    /**
     * 是否为外链
     * 菜单是否为外链（0是 1否）
     */
    isFrame?: string;
    /**
     * 是否缓存
     * 菜单是否缓存（选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段）
     */
    keepAlive?: string;
    /**
     * 是否隐藏
     * 菜单是否隐藏（选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问）
     */
    visible?: string;
    /**
     * 是否总是显示
     * 菜单是否总是显示（选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单）
     */
    alwaysShow?: string;
    /**
     * 菜单状态
     * 菜单的状态（0显示 1隐藏）
     */
    status?: string;
    /**
     * 权限字符串
     * 菜单的权限字符串
     */
    perms?: string;
    /**
     * 菜单图标
     * 菜单的图标
     */
    icon?: string;
    /**
     * 创建人
     * 菜单的创建人
     */
    createBy?: string;
    /**
     * 更新人
     * 菜单的更新人
     */
    updateBy?: string;
    /**
     * 备注
     * 菜单的备注
     */
    remark?: string;
    /**
     * 菜单层级
     * 菜单的层级
     */
    level?: number;
    /**
     * 子菜单列表
     * 菜单的子菜单列表
     */
    children?: Menu[];
}
