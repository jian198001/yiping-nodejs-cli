// 引入 @midwayjs/bootstrap 模块中的 Bootstrap 类
const { Bootstrap } = require('@midwayjs/bootstrap');

/**
 * 启动 Midway 应用程序。
 * 
 * 该函数调用 Bootstrap 类的 run 方法来启动 Midway 应用程序。
 * Bootstrap 类负责初始化和配置 Midway 应用程序的各种组件和服务。
 * run 方法执行启动过程，包括加载配置、初始化插件、启动服务器等操作。
 */
Bootstrap.run();
