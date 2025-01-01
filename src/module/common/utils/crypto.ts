/**
 * 导入Node.js的crypto模块，用于加密和解密操作
 */
const crypto: any = require('crypto');

/**
 * 计算输入字符串的MD5哈希值
 * 
 * @param {string} val - 需要计算哈希值的字符串
 * @returns {string} 返回计算得到的MD5哈希值
 */
export function md5(val: string) {
  // 创建一个MD5哈希对象
  const hash = crypto.createHash('md5');

  // 更新哈希对象的内容为输入字符串
  hash.update(val);

  // 计算哈希值并返回十六进制表示
  return hash.digest('hex');
}

/**
 * 计算输入字符串的SHA-256哈希值
 * 
 * @param {string} val - 需要计算哈希值的字符串
 * @returns {string} 返回计算得到的SHA-256哈希值
 */
export function sha256(val: string) {
  // 创建一个HMAC对象，使用SHA-256算法和空密钥
  const hmac = crypto.createHmac('sha256', '');

  // 更新HMAC对象的内容为输入字符串，并指定编码为UTF-8
  hmac.update(val, 'utf-8');

  // 计算HMAC值并返回十六进制表示
  return hmac.digest('hex');
}
