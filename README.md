# 一平midway脚手架

#### 介绍
一平midway脚手架是一平软件推出的基于阿里midway框架的后端服务框架。提供了基础的后台功能，包括员工管理、部门管理、角色管理、菜单管理、商品、订单管理等。

本系统参考了芋道和若依的大量源码，对芋道和若依团队表示强烈感谢！

#### 软件架构
软件目录结构基于midway.js确定的基础结构。<br/>
业务代码处于src目录中。<br/>
config -- 基础配置<br/>
controller -- 接收并处理请求<br/>
controller-buyer-uni -- 接收并处理uni-app端会员请求<br/>
controller-staff-web -- 接收并处理web后台员工端请求<br/>
entity -- 实体model类<br/>
job -- 定时任务<br/>
module -- 非midway框架的约定目录，为本项目自约定目录，放公共模块<br/>
service -- 服务层，会被controller层调用<br/>
socket -- webSocket请求层<br/>

#### 代码对应的用户角色
buyer -- 买家用户、消费者用户、软件直接面对的终端用户
staff -- 管理员用户、卖方用户，是一般系统中不可替代的基本角色

#### controller层结构
用户角色->使用设备->业务场景代码

例如：
用户角色(buyer)->使用设备(uni)->业务场景(frontPage用户不需要登录可以看到的界面)

#### 使用设备层区分

使用设备一般分为
uni: 移动端（手机、平板设备等)
web: PC端
screen: 大屏


#### 使用说明

1.  下载项目代码
2.  cnpm i 安装依赖
3.  编写业务代码
4.  npm run dev在开发模式下运行项目
5.  开发完成后，npm run build可以在生产环境下进行构建
6.  pm2 start ./bootstrap.js 可以在pm2中运行

#### module中内置模块

area -- 地区管理<br/>
auth -- 权限、菜单管理<br/>
bpm -- 工作流<br/>
common -- 基本、通用功能<br/>
content -- 内容管理（文章、栏目）<br/>
dataSource -- 数据源管理<br/>
dict -- 字典管理<br/>
errorCode -- 错误码管理<br/>
file -- 文件管理--已作废<br/>
form -- 表单管理<br/>
inventory -- 库存管理<br/>
job -- 任务管理<br/>
log -- 日志管理<br/>
mobile -- 移动端管理<br/>
notify -- 站内信管理<br/>
oa -- 部门、员工管理<br/>
partyApi -- 第三方API<br/>
purchase -- 采购管理<br/>
socket -- webSocket管理<br/>
tenant -- 租户管理<br/>
tradeOrder -- 商城管理<br/>

module中各个model对象，因为和数据库表结构相关，原本是放置在module各个模块中，但出现了在npm run build后，在pm2运行时，typeorm无法加载相关entity的问题，所以后续统一放置在了src/entity目录下。

核心模块主要分为如下几个部分：
1. 用户、角色、权限、部门、岗位管理
2. 内容管理(简化版cms)，文章、栏目管理
3. 商品、订单管理
4. 物料采购、库存、领用管理
