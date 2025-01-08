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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffWebUserCenterRegionRegionController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const jwt_passport_middleware_1 = require("../../../../../middleware/jwt.passport.middleware");
/**
 * 员工用户中心区域控制器
 */
let StaffWebUserCenterRegionRegionController = class StaffWebUserCenterRegionRegionController {
    /**
     * 获取指定省份的城市列表
     *
     * @param province - 省份名称
     * @returns 返回城市列表
     */
    async city(province) {
        return [
            {
                "province": "河北省",
                "name": "石家庄市",
                "id": "130100"
            },
            {
                "province": "河北省",
                "name": "唐山市",
                "id": "130200"
            },
            {
                "province": "河北省",
                "name": "秦皇岛市",
                "id": "130300"
            },
            {
                "province": "河北省",
                "name": "邯郸市",
                "id": "130400"
            },
            {
                "province": "河北省",
                "name": "邢台市",
                "id": "130500"
            },
            {
                "province": "河北省",
                "name": "保定市",
                "id": "130600"
            },
            {
                "province": "河北省",
                "name": "张家口市",
                "id": "130700"
            },
            {
                "province": "河北省",
                "name": "承德市",
                "id": "130800"
            },
            {
                "province": "河北省",
                "name": "沧州市",
                "id": "130900"
            },
            {
                "province": "河北省",
                "name": "廊坊市",
                "id": "131000"
            },
            {
                "province": "河北省",
                "name": "衡水市",
                "id": "131100"
            },
            {
                "province": "河北省",
                "name": "省直辖县级行政区划",
                "id": "139000"
            }
        ];
    }
    /**
     * 获取所有地区列表
     *
     * @returns 返回地区列表
     */
    async getById() {
        return [
            {
                name: "北京市",
                id: "110000",
            },
            {
                name: "天津市",
                id: "120000",
            },
            {
                name: "河北省",
                id: "130000",
            },
            {
                name: "山西省",
                id: "140000",
            },
            {
                name: "内蒙古自治区",
                id: "150000",
            },
            {
                name: "辽宁省",
                id: "210000",
            },
            {
                name: "吉林省",
                id: "220000",
            },
            {
                name: "黑龙江省",
                id: "230000",
            },
            {
                name: "上海市",
                id: "310000",
            },
            {
                name: "江苏省",
                id: "320000",
            },
            {
                name: "浙江省",
                id: "330000",
            },
            {
                name: "安徽省",
                id: "340000",
            },
            {
                name: "福建省",
                id: "350000",
            },
            {
                name: "江西省",
                id: "360000",
            },
            {
                name: "山东省",
                id: "370000",
            },
            {
                name: "河南省",
                id: "410000",
            },
            {
                name: "湖北省",
                id: "420000",
            },
            {
                name: "湖南省",
                id: "430000",
            },
            {
                name: "广东省",
                id: "440000",
            },
            {
                name: "广西壮族自治区",
                id: "450000",
            },
            {
                name: "海南省",
                id: "460000",
            },
            {
                name: "重庆市",
                id: "500000",
            },
            {
                name: "四川省",
                id: "510000",
            },
            {
                name: "贵州省",
                id: "520000",
            },
            {
                name: "云南省",
                id: "530000",
            },
            {
                name: "西藏自治区",
                id: "540000",
            },
            {
                name: "陕西省",
                id: "610000",
            },
            {
                name: "甘肃省",
                id: "620000",
            },
            {
                name: "青海省",
                id: "630000",
            },
            {
                name: "宁夏回族自治区",
                id: "640000",
            },
            {
                name: "新疆维吾尔自治区",
                id: "650000",
            },
            {
                name: "台湾省",
                id: "710000",
            },
            {
                name: "香港特别行政区",
                id: "810000",
            },
            {
                name: "澳门特别行政区",
                id: "820000",
            },
        ];
    }
};
__decorate([
    (0, decorator_1.All)("/city.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __param(0, (0, decorator_1.Query)("province")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterRegionRegionController.prototype, "city", null);
__decorate([
    (0, decorator_1.All)("/region.json", { middleware: [jwt_passport_middleware_1.JwtPassportMiddleware] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterRegionRegionController.prototype, "getById", null);
StaffWebUserCenterRegionRegionController = __decorate([
    (0, decorator_1.Controller)("/staff/web/userCenter/region/region")
], StaffWebUserCenterRegionRegionController);
exports.StaffWebUserCenterRegionRegionController = StaffWebUserCenterRegionRegionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvcmVnaW9uL3JlZ2lvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE2RDtBQUU3RCwrRkFBMEY7QUFFMUY7O0dBRUc7QUFFSCxJQUFhLHdDQUF3QyxHQUFyRCxNQUFhLHdDQUF3QztJQUNuRDs7Ozs7T0FLRztJQUVJLEtBQUssQ0FBQyxJQUFJLENBQW9CLFFBQWdCO1FBQ25ELE9BQU87WUFDTDtnQkFDRSxVQUFVLEVBQUUsS0FBSztnQkFDakIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7YUFDZjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxRQUFRO2FBQ2Y7WUFDRDtnQkFDRSxVQUFVLEVBQUUsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7YUFDZjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxRQUFRO2FBQ2Y7WUFDRDtnQkFDRSxVQUFVLEVBQUUsS0FBSztnQkFDakIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7YUFDZjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxRQUFRO2FBQ2Y7WUFDRDtnQkFDRSxVQUFVLEVBQUUsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLFFBQVE7YUFDZjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixJQUFJLEVBQUUsUUFBUTthQUNmO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixJQUFJLEVBQUUsUUFBUTthQUNmO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLE9BQU87UUFDbEIsT0FBTztZQUNMO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixFQUFFLEVBQUUsUUFBUTthQUNiO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7YUFDYjtZQUNEO2dCQUNFLElBQUksRUFBRSxTQUFTO2dCQUNmLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixFQUFFLEVBQUUsUUFBUTthQUNiO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBbk5DO0lBREMsSUFBQSxlQUFHLEVBQUMsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsK0NBQXFCLENBQUMsRUFBRSxDQUFDO0lBQ3hDLFdBQUEsSUFBQSxpQkFBSyxFQUFDLFVBQVUsQ0FBQyxDQUFBOzs7O29FQStEbkM7QUFRRDtJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLCtDQUFxQixDQUFDLEVBQUUsQ0FBQzs7Ozt1RUE0STVEO0FBMU5VLHdDQUF3QztJQURwRCxJQUFBLHNCQUFVLEVBQUMscUNBQXFDLENBQUM7R0FDckMsd0NBQXdDLENBMk5wRDtBQTNOWSw0RkFBd0MifQ==