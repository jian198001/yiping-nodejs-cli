"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const fileUtils = require("../common/utils/fileUtils");
const path = require("path");
const strUtils_1 = require("../common/utils/strUtils");
let PdfService = class PdfService extends base_service_1.BaseService {
    /**
     * 将PDF文件转换为图片
     * @param pdfFile - 要转换的PDF文件路径
     * @param outDir - 输出图片的目录
     * @returns 转换后的图片文件路径数组
     */
    async toImg(pdfFile, outDir) {
        const pdf = require('pdf-poppler');
        // 转换选项
        const opts = {
            format: 'png',
            out_dir: outDir,
            out_prefix: 'outputImg',
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
    async imgZip(pdfFile, appDir) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const dayjs = require('dayjs');
        // 生成日期目录路径
        const dayPath = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, 'public/fileLoad/upload/pdf', (_c = (_b = dayjs()).format) === null || _c === void 0 ? void 0 : _c.call(_b, 'YYYYMMDD'));
        // 生成完整目录路径
        const dir = (_d = path === null || path === void 0 ? void 0 : path.join) === null || _d === void 0 ? void 0 : _d.call(path, appDir, dayPath);
        // 生成唯一的文件名
        const uuidname = (0, strUtils_1.uuid)();
        // 生成输出目录路径
        const outDir = (_e = path === null || path === void 0 ? void 0 : path.join) === null || _e === void 0 ? void 0 : _e.call(path, dir, uuidname);
        const fse = require('fs-extra');
        // 确保输出目录存在
        fse.ensureDirSync(outDir);
        // 将PDF转换为图片
        await (this === null || this === void 0 ? void 0 : this.toImg(pdfFile, outDir));
        // 读取输出目录中的所有文件
        const files = fse.readdirSync(outDir);
        const fileList = [];
        // 构建文件列表
        files.forEach(item => {
            var _a, _b;
            (_a = fileList.push) === null || _a === void 0 ? void 0 : _a.call(fileList, (_b = path === null || path === void 0 ? void 0 : path.join) === null || _b === void 0 ? void 0 : _b.call(path, outDir, item));
        });
        // 生成目标ZIP文件路径
        const targetFile = (_f = path === null || path === void 0 ? void 0 : path.join) === null || _f === void 0 ? void 0 : _f.call(path, dir, uuidname + '.zip');
        // 将文件列表压缩成ZIP文件
        await fileUtils.zip(targetFile, fileList);
        // 返回ZIP文件的相对路径
        return '/' + ((_j = (_g = path === null || path === void 0 ? void 0 : path.join) === null || _g === void 0 ? void 0 : (_h = _g.call(path, dayPath, uuidname + '.zip')).replace) === null || _j === void 0 ? void 0 : _j.call(_h, /\\/g, '/'));
    }
    /**
     * 将PDF文件转换为Word文档
     * @param pdfFile - 要转换的PDF文件路径
     * @param appDir - 应用程序的根目录
     * @returns 转换后的Word文档路径
     */
    async pdf2docx(pdfFile, appDir) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const pdf2docx = require('pdf2docx');
        const dayjs = require('dayjs');
        // 生成日期目录路径
        const dayPath = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, 'public/fileLoad/upload/pdf', (_c = (_b = dayjs()).format) === null || _c === void 0 ? void 0 : _c.call(_b, 'YYYYMMDD'));
        // 生成完整目录路径
        const dir = (_d = path === null || path === void 0 ? void 0 : path.join) === null || _d === void 0 ? void 0 : _d.call(path, appDir, dayPath);
        // 生成唯一的文件名
        const uuidname = (0, strUtils_1.uuid)();
        const fse = require('fs-extra');
        // 确保目录存在
        fse.ensureDirSync(dir);
        // 生成目标Word文档路径
        const targetFile = (_e = path === null || path === void 0 ? void 0 : path.join) === null || _e === void 0 ? void 0 : _e.call(path, dir, uuidname + '.docx');
        // 转换PDF到Word
        await pdf2docx.convert(pdfFile, // PDF文件路径
        targetFile, // 输出Word文档的路径
        {
        // 可选的转换选项
        // 例如，如果你想要从第2页开始转换，到第5页结束：
        // pages: '2-5',
        });
        // 返回Word文档的相对路径
        return '/' + ((_h = (_f = path === null || path === void 0 ? void 0 : path.join) === null || _f === void 0 ? void 0 : (_g = _f.call(path, dayPath, uuidname + '.docx')).replace) === null || _h === void 0 ? void 0 : _h.call(_g, /\\/g, '/'));
    }
};
PdfService = __decorate([
    (0, decorator_1.Provide)()
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9maWxlL3BkZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5QyxpRUFBNkQ7QUFFN0QsdURBQXVEO0FBQ3ZELDZCQUE4QjtBQUM5Qix1REFBZ0Q7QUFHaEQsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLDBCQUFXO0lBQ3pDOzs7OztPQUtHO0lBQ0ssS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFlLEVBQUUsTUFBYztRQUNqRCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbkMsT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHO1lBQ1gsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLElBQUksRUFBRSxJQUFJLEVBQUUsZ0RBQWdEO1NBQzdELENBQUM7UUFFRixXQUFXO1FBQ1gsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU3QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBZSxFQUFFLE1BQWM7O1FBRWpELE1BQU0sS0FBSyxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwQyxXQUFXO1FBQ1gsTUFBTSxPQUFPLEdBQVcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxxREFDaEMsNEJBQTRCLEVBQUUsTUFBQSxNQUFBLEtBQUssRUFBRSxFQUFDLE1BQU0sbURBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUU5RCxXQUFXO1FBQ1gsTUFBTSxHQUFHLEdBQUcs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