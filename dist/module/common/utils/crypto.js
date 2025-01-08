"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = exports.md5 = void 0;
/**
 * 导入Node.js的crypto模块，用于加密和解密操作
 */
const crypto = require('crypto');
/**
 * 计算输入字符串的MD5哈希值
 *
 * @param {string} val - 需要计算哈希值的字符串
 * @returns {string} 返回计算得到的MD5哈希值
 */
function md5(val) {
    // 创建一个MD5哈希对象
    const hash = crypto.createHash('md5');
    // 更新哈希对象的内容为输入字符串
    hash.update(val);
    // 计算哈希值并返回十六进制表示
    return hash.digest('hex');
}
exports.md5 = md5;
/**
 * 计算输入字符串的SHA-256哈希值
 *
 * @param {string} val - 需要计算哈希值的字符串
 * @returns {string} 返回计算得到的SHA-256哈希值
 */
function sha256(val) {
    // 创建一个HMAC对象，使用SHA-256算法和空密钥
    const hmac = crypto.createHmac('sha256', '');
    // 更新HMAC对象的内容为输入字符串，并指定编码为UTF-8
    hmac.update(val, 'utf-8');
    // 计算HMAC值并返回十六进制表示
    return hmac.digest('hex');
}
exports.sha256 = sha256;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL3V0aWxzL2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFRLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV0Qzs7Ozs7R0FLRztBQUNILFNBQWdCLEdBQUcsQ0FBQyxHQUFXO0lBQzdCLGNBQWM7SUFDZCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXRDLGtCQUFrQjtJQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLGlCQUFpQjtJQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVRELGtCQVNDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixNQUFNLENBQUMsR0FBVztJQUNoQyw2QkFBNkI7SUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFN0MsZ0NBQWdDO0lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTFCLG1CQUFtQjtJQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVRELHdCQVNDIn0=