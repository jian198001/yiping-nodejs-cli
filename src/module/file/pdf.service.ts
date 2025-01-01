import { Provide } from '@midwayjs/decorator';
import { BaseService } from '../common/service/base.service';

import * as fileUtils from '../common/utils/fileUtils';
import path = require('path');
import { uuid } from '../common/utils/strUtils';

@Provide()
export class PdfService extends BaseService {
  /**
   * toPic
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

  public async imgZip(pdfFile: string, appDir: string): Promise<string> {

    const dayjs: any = require('dayjs');

    const dayPath: string = path?.join?.(
      'public/fileLoad/upload/pdf', dayjs().format?.('YYYYMMDD'));

    const dir = path?.join?.(
      appDir, dayPath
    );

    const uuidname = uuid();

    const outDir = path?.join?.(dir, uuidname);

    const fse = require('fs-extra');

    fse.ensureDirSync(outDir);

    await this?.toImg(pdfFile, outDir);

    const files = fse.readdirSync(outDir);

    const fileList: string[] = [];

    files.forEach(item => {
      fileList.push?.(path?.join?.(outDir, item));
    });

    const targetFile = path?.join?.(dir, uuidname + '.zip');

    await fileUtils.zip(targetFile, fileList);

    return '/' + path?.join?.(dayPath, uuidname + '.zip').replace?.(/\\/g, '/');

  }

  /**
   * pdf2docx
   
   */
  public async pdf2docx(pdfFile: string, appDir: string): Promise<string> {

    const pdf2docx = require('pdf2docx');

    const dayjs: any = require('dayjs');

    const dayPath: string = path?.join?.(
      'public/fileLoad/upload/pdf', dayjs().format?.('YYYYMMDD'));

    const dir = path?.join?.(
      appDir, dayPath
    );

    const uuidname = uuid();
 
    const fse = require('fs-extra');

    fse.ensureDirSync(dir);
    
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

    return '/' + path?.join?.(dayPath, uuidname + '.docx').replace?.(/\\/g, '/')

  }

}
