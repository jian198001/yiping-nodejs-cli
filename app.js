// 导入http-errors模块，用于创建HTTP错误
var createError = require('http-errors');
// 导入express模块，用于创建Web应用程序
var express = require('express');
// 导入path模块，用于处理和转换文件路径
var path = require('path');
// 导入cookie-parser模块，用于解析Cookie头
var cookieParser = require('cookie-parser');
// 导入morgan模块，用于记录HTTP请求日志
var logger = require('morgan');

// 导入index路由模块
var indexRouter = require('./routes/index');
// 导入users路由模块
var usersRouter = require('./routes/users');

// 创建Express应用程序实例
var app = express();

// 设置视图引擎为Pug，并指定视图文件的目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 使用morgan中间件记录HTTP请求日志，开发环境下使用'dev'格式
app.use(logger('dev'));
// 使用express.json()中间件解析JSON请求体
app.use(express.json());
// 使用express.urlencoded()中间件解析URL编码的请求体，extended: false表示使用简单的解析算法
app.use(express.urlencoded({ extended: false }));
// 使用cookieParser中间件解析Cookie头
app.use(cookieParser());
// 使用express.static()中间件提供静态文件服务，指定public目录为静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 使用index路由处理根路径（'/'）的请求
app.use('/', indexRouter);
// 使用users路由处理'/users'路径的请求
app.use('/users', usersRouter);

// 捕获404错误，并将其转发到错误处理中间件
app.use(function(req, res, next) {
  // 创建一个404错误并传递给下一个中间件
  next(createError(404));
});

// 错误处理中间件
app.use(function(err, req, res, next) {
  // 设置响应的本地变量，仅在开发环境下提供错误详细信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 设置响应状态码为错误状态码（如果有），否则为500
  res.status(err.status || 500);
  // 渲染error.pug视图模板
  res.render('error');
});

// 导出Express应用程序实例，以便在其他模块中使用
module.exports = app;
