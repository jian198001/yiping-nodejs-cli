var express = require('express');
var router = express.Router();

/**
 * GET home page.
 * 
 * 该路由处理对根路径（'/'）的GET请求，并渲染名为'index'的视图模板，同时传递一个包含'title'属性的对象作为模板数据。
 * 
 * @param {Object} req - 包含请求信息的对象。
 * @param {Object} res - 用于发送响应的对象。
 * @param {Function} next - 用于传递控制权到下一个中间件的函数。
 */
router.get('/', function(req, res, next) {
  // 使用res.render方法渲染名为'index'的视图模板，并传递一个包含'title'属性的对象作为模板数据
  res.render('index', { title: 'Express' });
});

// 导出router实例，以便在其他模块中使用
module.exports = router;
