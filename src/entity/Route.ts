import {ApiProperty,} from "@midwayjs/swagger";

/**
 * 路由实体类
 * 用于定义路由的相关属性和配置
 */
export class Route {

  /**
   * 路由名字
   * 对应路由的名称
   */
  @ApiProperty({description: '路由名字',})
  name: string;
  
  /**
   * 路由地址
   * 对应路由的路径
   */
  @ApiProperty({description: '路由地址',})
  path: string;
  
  /**
   * 是否隐藏路由
   * 当设置为true时，该路由不会在侧边栏出现
   */
  @ApiProperty({description: '是否隐藏路由，当设置 true 的时候该路由不会再侧边栏出现',})
  hidden: boolean = null;
  
  /**
   * 重定向地址
   * 当设置为noRedirect时，该路由在面包屑导航中不可被点击
   */
  @ApiProperty({description: '重定向地址，当设置 noRedirect 的时候该路由在面包屑导航中不可被点击',})
  redirect: string;
  
  /**
   * 组件地址
   * 对应路由所使用的组件路径
   */
  @ApiProperty({description: '组件地址',})
  component: string;
  
  /**
   * 路由参数
   * 以JSON字符串的形式存储路由参数，如 {"id": 1, "name": "ry"}
   */
  @ApiProperty({description: '路由参数：如 {"id": 1, "name": "ry"}',})
  query: string;
  
  /**
   * 是否总是显示子路由
   * 当一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式，如组件页面
   */
  @ApiProperty({description: '当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面',})
  alwaysShow: boolean = null;
  
  /**
   * 其他元素
   * 用于存储其他与路由相关的元数据
   */
  @ApiProperty({description: '其他元素',})
  meta: any = null;
  
  /**
   * 子路由列表
   * 用于存储当前路由的子路由信息
   */
  children: any[] = [];

}
