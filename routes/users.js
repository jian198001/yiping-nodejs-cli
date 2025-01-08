// 引入express模块
var express = require('express');
// 创建一个express的Router实例
var router = express.Router();

/**
 * GET users listing.
 * 
 * 该路由处理对'/users'路径的GET请求，并返回一个字符串'respond with a resource'。
 * 
 * @param {Object} req - 包含请求信息的对象。
 * @param {Object} res - 用于发送响应的对象。
 * @param {Function} next - 用于传递控制权到下一个中间件的函数。
 */
router.get('/', function(req, res, next) {
  // 发送字符串'respond with a resource'作为响应
  res.send('respond with a resource');
});

// 导出router实例，以便在其他模块中使用
module.exports = router;
