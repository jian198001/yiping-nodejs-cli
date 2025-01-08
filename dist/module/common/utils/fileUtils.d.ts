/**
 * 将文件从源路径复制到目标路径
 *
 * @param {Object} file - 包含文件数据和文件名的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
export declare function copySync(file: any, type: string, appDir: string): string;
/**
 * 将数据写入文件
 *
 * @param {Object} data - 包含文件数据的对象
 * @param {string} type - 文件类型，用于构建目标路径
 * @param {string} appDir - 应用程序的根目录
 * @returns {string} 返回目标文件的相对路径
 */
export declare function outputFileSync(data: any, type: string, appDir: string): string;
/**
 * 将多个文件压缩成一个zip文件
 *
 * @param {string} targetFile - 目标zip文件的路径，默认为'a.zip'
 * @param {string[]} files - 要压缩的文件路径数组
 */
export declare function zip(targetFile: string, files: string[]): Promise<void>;
