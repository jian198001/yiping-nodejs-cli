import { All, Controller, Query } from "@midwayjs/decorator";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

/**
 * 员工用户中心区域控制器
 */
@Controller("/staff/web/userCenter/region/region", { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterRegionRegionController {
  /**
   * 获取指定省份的城市列表
   * 
   * @param province - 省份名称
   * @returns 返回城市列表
   */
  @All("/city.json", )
  public async city(@Query("province") province: string): Promise<any> {
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
  @All("/region.json", )
  public async getById(): Promise<any> {
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
}
