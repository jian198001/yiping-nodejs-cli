"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.outputFileSync = exports.copySync = void 0;
/**
 * 导入Node.js的path模块，用于处理文件路径
 */
const path = require('path');
/**
 * 导入string-random模块，用于生成随机字符串
 */
const stringRandom = require('string-random');
/**
 * 导入fs-extra模块，用于文件系统操作
 */
const fse = require('fs-extra');
/**
 * 导入dayjs模块，用于日期和时间处理
 */
const dayjs = require('dayjs');
/**
 * 将文件从源路径复制到目标路径
 *
 * @param {Object} file - 包含文件数据和文件名的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
function copySync(file, type, appDir) {
    var _a, _b, _c, _d, _e;
    // 如果文件对象中没有filename属性，则设置默认值为'a.jpg'
    if ((file === null || file === void 0 ? void 0 : file.filename) === undefined) {
        file.filename = 'a.jpg';
    }
    // 获取文件的扩展名
    const extname = path === null || path === void 0 ? void 0 : path.extname(file.filename);
    // 生成一个随机的文件名
    const uri = stringRandom(32) + extname;
    // 构建目标路径，包括日期目录
    const pa = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, 'public/fileLoad/upload', type, (_c = (_b = dayjs()).format) === null || _c === void 0 ? void 0 : _c.call(_b, 'YYYYMMDD'));
    // 确保目标目录存在
    fse.ensureDirSync(pa);
    // 构建目标文件的相对路径
    const filePathReturn = (_d = path === null || path === void 0 ? void 0 : path.join) === null || _d === void 0 ? void 0 : _d.call(path, pa, uri);
    // 构建目标文件的绝对路径
    const filePath = (_e = path === null || path === void 0 ? void 0 : path.join) === null || _e === void 0 ? void 0 : _e.call(path, appDir, filePathReturn);
    // 将文件从源路径复制到目标路径
    fse.copySync(file.data, filePath);
    // 返回目标文件的相对路径
    return filePathReturn;
}
exports.copySync = copySync;
/**
 * 将数据写入文件
 *
 * @param {Object} data - 包含文件数据的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
function outputFileSync(data, type, appDir) {
    var _a, _b, _c, _d, _e;
    // 设置文件的扩展名
    const extname = '.jpeg';
    // 生成一个随机的文件名
    const uri = stringRandom(32) + extname;
    // 构建目标路径，包括日期目录
    const pa = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, 'public/fileLoad/upload', type, (_c = (_b = dayjs()).format) === null || _c === void 0 ? void 0 : _c.call(_b, 'YYYYMMDD'));
    // 确保目标目录存在
    fse === null || fse === void 0 ? void 0 : fse.ensureDirSync(pa);
    // 构建目标文件的相对路径
    const filePathReturn = (_d = path === null || path === void 0 ? void 0 : path.join) === null || _d === void 0 ? void 0 : _d.call(path, pa, uri);
    // 构建目标文件的绝对路径
    const filePath = (_e = path === null || path === void 0 ? void 0 : path.join) === null || _e === void 0 ? void 0 : _e.call(path, appDir, filePathReturn);
    // 将数据转换为Buffer对象
    const buffer = Buffer === null || Buffer === void 0 ? void 0 : Buffer.from(data === null || data === void 0 ? void 0 : data.data);
    // 将Buffer对象写入文件
    fse === null || fse === void 0 ? void 0 : fse.outputFileSync(filePath, buffer);
    // 返回目标文件的相对路径
    return filePathReturn;
}
exports.outputFileSync = outputFileSync;
/**
 * 将多个文件压缩成一个zip文件
 *
 * @param {string} targetFile - 目标zip文件的路径，默认为'a.zip'
 * @param {string[]} files - 要压缩的文件路径数组
 */
async function zip(targetFile = 'a.zip', files) {
    // 确保目标文件的目录存在
    fse.ensureDirSync(path === null || path === void 0 ? void 0 : path.dirname(targetFile));
    // 导入archiver模块，用于创建压缩文件
    const archiver = require('archiver');
    // 创建文件输出流
    const output = fse.createWriteStream(targetFile);
    const archive = archiver('zip', {
        zlib: { level: 9 }, // 压缩级别
    });
    // 监听输出流关闭事件
    output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('压缩完成，文件大小：' + archive.pointer() + ' bytes');
    });
    // 监听压缩过程中的警告
    archive.on('warning', err => {
        if (err.code === 'ENOENT') {
            // log warning
        }
        else {
            // 抛出错误
            throw err;
        }
    });
    // 监听压缩过程中的错误
    archive.on('error', err => {
        throw err;
    });
    // 将输出流与存档关联起来
    archive.pipe(output);
    // 添加文件到压缩包中
    files.forEach(file => {
        archive.file(file, { name: path === null || path === void 0 ? void 0 : path.basename(file) });
    });
    // 完成压缩
    await archive.finalize();
}
exports.zip = zip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL3V0aWxzL2ZpbGVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsQzs7R0FFRztBQUNILE1BQU0sWUFBWSxHQUFRLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVuRDs7R0FFRztBQUNILE1BQU0sR0FBRyxHQUFRLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVyQzs7R0FFRztBQUNILE1BQU0sS0FBSyxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVwQzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsTUFBYzs7SUFDOUQscUNBQXFDO0lBQ3JDLElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxNQUFLLFNBQVMsRUFBRTtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztLQUN6QjtJQUVELFdBQVc7SUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU3QyxhQUFhO0lBQ2IsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUV2QyxnQkFBZ0I7SUFDaEIsTUFBTSxFQUFFLEdBQVcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxxREFDM0Isd0JBQXdCLEVBQ3hCLElBQUksRUFDSixNQUFBLE1BQUEsS0FBSyxFQUFFLEVBQUMsTUFBTSxtREFBRyxVQUFVLENBQUMsQ0FDN0IsQ0FB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