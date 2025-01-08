"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IndexController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 网站首页控制器
 */
let IndexController = IndexController_1 = class IndexController {
    /**
     * 处理/index.html路径的请求
     *
     * @returns 返回重定向到登录页面的HTML内容
     */
    async index() {
        // 修改HTML内容，重定向到登录页面
        IndexController_1.html = `<html>
<body>
  <script language="javascript" type="text/javascript">
    window.location.href = "public/index.html#/login?redirect=/index";
  </script>
</body>
</html>`;
        // 返回修改后的HTML内容
        return IndexController_1.html;
    }
    /**
     * 处理根路径的请求
     *
     * @returns 返回网站正在建设中的HTML内容
     */
    async root() {
        // 返回网站正在建设中的HTML内容
        return IndexController_1.html;
    }
};
/**
 * 网站正在建设中的HTML内容
 */
IndexController.html = '<html><body><br></br><span><center>网站正在建设中</center></span><br></br><br></br><span><center><a href="https://beian.miit.gov.cn/" target="_blank">ICP备案：冀ICP备2023034445号</a></center></span><br></br></body></html>';
__decorate([
    (0, decorator_1.All)("/index.html"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
__decorate([
    (0, decorator_1.All)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "root", null);
IndexController = IndexController_1 = __decorate([
    (0, decorator_1.Controller)("/")
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9pbmRleC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFFdEQ7O0dBRUc7QUFFSCxJQUFhLGVBQWUsdUJBQTVCLE1BQWEsZUFBZTtJQU8xQjs7OztPQUlHO0lBRUksS0FBSyxDQUFDLEtBQUs7UUFDaEIsb0JBQW9CO1FBQ3BCLGlCQUFlLENBQUMsSUFBSSxHQUFHOzs7Ozs7UUFNbkIsQ0FBQztRQUVMLGVBQWU7UUFDZixPQUFPLGlCQUFlLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLElBQUk7UUFDZixtQkFBbUI7UUFDbkIsT0FBTyxpQkFBZSxDQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQXBDQzs7R0FFRztBQUNZLG9CQUFJLEdBQ2pCLGtOQUFtTixDQUFBO0FBUXJOO0lBREMsSUFBQSxlQUFHLEVBQUMsYUFBYSxDQUFDOzs7OzRDQWFsQjtBQVFEO0lBREMsSUFBQSxlQUFHLEVBQUMsR0FBRyxDQUFDOzs7OzJDQUlSO0FBcENVLGVBQWU7SUFEM0IsSUFBQSxzQkFBVSxFQUFDLEdBQUcsQ0FBQztHQUNILGVBQWUsQ0FxQzNCO0FBckNZLDBDQUFlIn0=