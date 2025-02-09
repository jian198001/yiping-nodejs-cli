/**
 * 导入Node.js的path模块，用于处理文件路径
 */
const path: any = require('path');

/**
 * 导入string-random模块，用于生成随机字符串
 */
const stringRandom: any = require('string-random');

/**
 * 导入fs-extra模块，用于文件系统操作
 */
const fse: any = require('fs-extra');

/**
 * 导入dayjs模块，用于日期和时间处理
 */
const dayjs: any = require('dayjs');

/**
 * 将文件从源路径复制到目标路径
 * 
 * @param {Object} file - 包含文件数据和文件名的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
export function copySync(file: any, type: string, appDir: string): string {
  // 如果文件对象中没有filename属性，则设置默认值为'a.jpg'
  if (file?.filename === undefined) {
    file.filename = 'a.jpg';
  }

  // 获取文件的扩展名
  const extname = path?.extname(file.filename);

  // 生成一个随机的文件名
  const uri = stringRandom(32) + extname;

  // 构建目标路径，包括日期目录
  const pa: string = path?.join?.(
    'public/fileLoad/upload',
    type,
    dayjs().format?.('YYYYMMDD')
  );

  // 确保目标目录存在
  fse.ensureDirSync(pa);

  // 构建目标文件的相对路径
  const filePathReturn = path?.join?.(pa, uri);

  // 构建目标文件的绝对路径
  const filePath = path?.join?.(appDir, filePathReturn);

  // 将文件从源路径复制到目标路径
  fse.copySync(file.data, filePath);

  // 返回目标文件的相对路径
  return filePathReturn;
}

/**
 * 将数据写入文件
 * 
 * @param {Object} data - 包含文件数据的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
export function outputFileSync(
  data: any,
  type: string,
  appDir: string
): string {
  // 设置文件的扩展名
  const extname = '.jpeg';

  // 生成一个随机的文件名
  const uri: string = stringRandom(32) + extname;

  // 构建目标路径，包括日期目录
  const pa: string = path?.join?.(
    'public/fileLoad/upload',
    type,
    dayjs().format?.('YYYYMMDD')
  );

  // 确保目标目录存在
  fse?.ensureDirSync(pa);

  // 构建目标文件的相对路径
  const filePathReturn: string = path?.join?.(pa, uri);

  // 构建目标文件的绝对路径
  const filePath: string = path?.join?.(appDir, filePathReturn);

  // 将数据转换为Buffer对象
  const buffer: any = Buffer?.from(data?.data);

  // 将Buffer对象写入文件
  fse?.outputFileSync(filePath, buffer);

  // 返回目标文件的相对路径
  return filePathReturn;
}

/**
 * 将多个文件压缩成一个zip文件
 * 
 * @param {string} targetFile - 目标zip文件的路径，默认为'a.zip'
 * @param {string[]} files - 要压缩的文件路径数组
 */
export async function zip(targetFile = 'a.zip', files: string[]) {
  // 确保目标文件的目录存在
  fse.ensureDirSync(path?.dirname(targetFile));

  // 导入archiver模块，用于创建压缩文件
  const archiver = require('archiver');

  // 创建文件输出流
  const output = fse.createWriteStream(targetFile);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // 压缩级别
  });

  // 监听输出流关闭事件
  output.on('close', () => {
    console?.log?.(archive.pointer() + ' total bytes');
    console?.log?.('压缩完成，文件大小：' + archive.pointer() + ' bytes');
  });

  // 监听压缩过程中的警告
  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
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
    archive.file(file, { name: path?.basename(file) });
  });

  // 完成压缩
  await archive.finalize();
}
