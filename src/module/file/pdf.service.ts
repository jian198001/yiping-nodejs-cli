import { Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';

import * as fileUtils from '../common/utils/fileUtils';
import path = require('path');
import { uuid } from '../common/utils/strUtils';

@Provide()
export class PdfService extends BaseService {
  /**
   * 将PDF文件转换为图片
   * @param pdfFile - 要转换的PDF文件路径
   * @param outDir - 输出图片的目录
   * @returns 转换后的图片文件路径数组
   */
  private async toImg(pdfFile: string, outDir: string): Promise<string[]> {
    const pdf = require('pdf-poppler');

    // 转换选项
    const opts = {
      format: 'png', // 输出图片格式，可以是 'jpeg', 'png', 'ppm', 'tiff', 'xps', 'xml', 'xps1', 'xps2' 等
      out_dir: outDir, // 输出目录
      out_prefix: 'outputImg', // 输出文件的前缀
      page: null, // 要转换的页码，可以是具体的页码或者一个页码范围，例如 [1, 3, 5] 或者 '1-5'
    };

    // 转换PDF为图片
    const res = await pdf.convert(pdfFile, opts);

    return res;
  }

  /**
   * 将PDF文件转换为图片并压缩成ZIP文件
   * @param pdfFile - 要转换的PDF文件路径
   * @param appDir - 应用程序的根目录
   * @returns 压缩后的ZIP文件路径
   */
  public async imgZip(pdfFile: string, appDir: string): Promise<string> {

    const dayjs: any = require('dayjs');

    // 生成日期目录路径
    const dayPath: string = path?.join?.(
      'public/fileLoad/upload/pdf', dayjs().format?.('YYYYMMDD'));

    // 生成完整目录路径
    const dir = path?.join?.(
      appDir, dayPath
    );

    // 生成唯一的文件名
    const uuidname = uuid();

    // 生成输出目录路径
    const outDir = path?.join?.(dir, uuidname);

    const fse = require('fs-extra');

    // 确保输出目录存在
    fse.ensureDirSync(outDir);

    // 将PDF转换为图片
    await this?.toImg(pdfFile, outDir);

    // 读取输出目录中的所有文件
    const files = fse.readdirSync(outDir);

    const fileList: string[] = [];

    // 构建文件列表
    files.forEach(item => {
      fileList.push?.(path?.join?.(outDir, item));
    });

    // 生成目标ZIP文件路径
    const targetFile = path?.join?.(dir, uuidname + '.zip');

    // 将文件列表压缩成ZIP文件
    await fileUtils.zip(targetFile, fileList);

    // 返回ZIP文件的相对路径
    return '/' + path?.join?.(dayPath, uuidname + '.zip').replace?.(/\\/g, '/');

  }

  /**
   * 将PDF文件转换为Word文档
   * @param pdfFile - 要转换的PDF文件路径
   * @param appDir - 应用程序的根目录
   * @returns 转换后的Word文档路径
   */
  public async pdf2docx(pdfFile: string, appDir: string): Promise<string> {

    const pdf2docx = require('pdf2docx');

    const dayjs: any = require('dayjs');

    // 生成日期目录路径
    const dayPath: string = path?.join?.(
      'public/fileLoad/upload/pdf', dayjs().format?.('YYYYMMDD'));

    // 生成完整目录路径
    const dir = path?.join?.(
      appDir, dayPath
    );

    // 生成唯一的文件名
    const uuidname = uuid();

    const fse = require('fs-extra');

    // 确保目录存在
    fse.ensureDirSync(dir);

    // 生成目标Word文档路径
    const targetFile = path?.join?.(dir, uuidname + '.docx');

    // 转换PDF到Word
    await pdf2docx.convert(
      pdfFile, // PDF文件路径
      targetFile, // 输出Word文档的路径
      {
        // 可选的转换选项
        // 例如，如果你想要从第2页开始转换，到第5页结束：
        // pages: '2-5',
      },
    )

    // 返回Word文档的相对路径
    return '/' + path?.join?.(dayPath, uuidname + '.docx').replace?.(/\\/g, '/')

  }

}
