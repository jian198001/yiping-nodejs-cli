import {
  All,
  App,
  Controller,
  Files,
  Inject,
  Query,
} from '@midwayjs/decorator';
import { PdfService } from '../../../../../../module/file/pdf.service';
import { Application } from '@midwayjs/koa';
import * as fileUtils from '../../../../../../module/common/utils/fileUtils';
import path = require('path');

@Controller('/buyer/uni/frontPage/pdf2pic')
export class BuyerUniFrontPagePdf2picController {
  @Inject()
  private pdfService: PdfService = null;

  @App()
  private app: Application = null;

  @All('/upload.json')
  public async upload(@Files() files, @Query() query): Promise<any> {

    const filePath = fileUtils.copySync(
      files?.[0],
      'upload',
      this?.app.getAppDir()
    );

    const p = path?.join?.(this?.app.getAppDir(), filePath);

    return  await this?.pdfService.imgZip(p, this?.app.getAppDir());
 
  }
}
