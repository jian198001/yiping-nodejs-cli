"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 导入Node.js的path和os模块
const path_1 = require("path");
const os_1 = require("os");
// 导入各种实体类
const Buyer_1 = require("../entity/Buyer");
const UserOpenId_1 = require("../entity/UserOpenId");
const ShopBuyer_1 = require("../entity/ShopBuyer");
const Goods_1 = require("../entity/Goods");
const Shop_1 = require("../entity/Shop");
const TradeOrder_1 = require("../entity/TradeOrder");
const OrderItem_1 = require("../entity/OrderItem");
const WxPayConfig_1 = require("../entity/WxPayConfig");
const WechatConfig_1 = require("../entity/WechatConfig");
const UserRoleMap_1 = require("../entity/UserRoleMap");
const TagListUser_1 = require("../entity/TagListUser");
const TagGoodsMap_1 = require("../entity/TagGoodsMap");
const Tag_1 = require("../entity/Tag");
const Tabbar_1 = require("../entity/Tabbar");
const SysParams_1 = require("../entity/SysParams");
const Stock_1 = require("../entity/Stock");
const Staff_1 = require("../entity/Staff");
const SkuValue_1 = require("../entity/SkuValue");
const SkuList_1 = require("../entity/SkuList");
const SkuKey_1 = require("../entity/SkuKey");
const ShopWxUserMap_1 = require("../entity/ShopWxUserMap");
const ShopSellerMap_1 = require("../entity/ShopSellerMap");
const SellerBuyMallMemberCard_1 = require("../entity/SellerBuyMallMemberCard");
const Route_1 = require("../entity/Route");
const RoleMenuMap_1 = require("../entity/RoleMenuMap");
const RoleDeptMap_1 = require("../entity/RoleDeptMap");
const Role_1 = require("../entity/Role");
const PurchaseOrderItem_1 = require("../entity/PurchaseOrderItem");
const PurchaseOrder_1 = require("../entity/PurchaseOrder");
const Post_1 = require("../entity/Post");
const PickupTemplate_1 = require("../entity/PickupTemplate");
const Password_1 = require("../entity/Password");
const Address_1 = require("../entity/Address");
const Aftersale_1 = require("../entity/Aftersale");
const Album_1 = require("../entity/Album");
const AlbumPic_1 = require("../entity/AlbumPic");
const AlipayConfig_1 = require("../entity/AlipayConfig");
const Area_1 = require("../entity/Area");
const Article_1 = require("../entity/Article");
const Auction_1 = require("../entity/Auction");
const AuctionActivity_1 = require("../entity/AuctionActivity");
const Brand_1 = require("../entity/Brand");
const BuyerReceiveAddress_1 = require("../entity/BuyerReceiveAddress");
const CardBaseInfo_1 = require("../entity/CardBaseInfo");
const CardDateInfo_1 = require("../entity/CardDateInfo");
const CardOfferBaseInfo_1 = require("../entity/CardOfferBaseInfo");
const CardTextImageList_1 = require("../entity/CardTextImageList");
const CardTimeLimit_1 = require("../entity/CardTimeLimit");
const CartItem_1 = require("../entity/CartItem");
const CashCard_1 = require("../entity/CashCard");
const CashCardOffer_1 = require("../entity/CashCardOffer");
const Category_1 = require("../entity/Category");
const Conf_1 = require("../entity/Conf");
const Consume_1 = require("../entity/Consume");
const MultipartFile_1 = require("../entity/MultipartFile");
const GoodsCategory_1 = require("../entity/GoodsCategory");
const User_1 = require("../module/common/model/User");
/**
 * 默认配置文件
 * 定义了应用程序的各种配置选项
 */
exports.default = {
    // 用于Cookie签名的密钥，应该更改为自己的并保持安全
    keys: '1650944839830_1213',
    /**
     * Koa框架配置
     */
    koa: {
        // 应用程序监听的端口号
        port: 7098,
        // 全局路由前缀
        globalPrefix: '/api'
    },
    /**
     * TypeORM配置
     */
    typeorm: {
        dataSource: {
            default: {
                /**
                 * 单数据库实例
                 */
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'test',
                password: 'aaaa1111',
                database: 'test',
                synchronize: false,
                logging: true,
                // 或者扫描形式
                entities: [
                    User_1.User,
                    Buyer_1.Buyer,
                    UserOpenId_1.UserOpenId,
                    ShopBuyer_1.ShopBuyer,
                    Goods_1.Goods,
                    Shop_1.Shop,
                    TradeOrder_1.TradeOrder,
                    OrderItem_1.OrderItem,
                    WxPayConfig_1.WxPayConfig,
                    WechatConfig_1.wechatConfig,
                    UserRoleMap_1.UserRoleMap,
                    UserOpenId_1.UserOpenId,
                    TagListUser_1.TagListUser,
                    TagGoodsMap_1.TagGoodsMap,
                    Tag_1.Tag,
                    Tabbar_1.Tabbar,
                    SysParams_1.SysParams,
                    Stock_1.Stock,
                    Staff_1.Staff,
                    SkuValue_1.SkuValue,
                    SkuList_1.SkuList,
                    SkuKey_1.SkuKey,
                    ShopWxUserMap_1.ShopWxUserMap,
                    ShopSellerMap_1.ShopSellerMap,
                    ShopBuyer_1.ShopBuyer,
                    SellerBuyMallMemberCard_1.SellerBuyMallMemberCard,
                    Route_1.Route,
                    RoleMenuMap_1.RoleMenuMap,
                    RoleDeptMap_1.RoleDeptMap,
                    Role_1.Role,
                    PurchaseOrderItem_1.PurchaseOrderItem,
                    PurchaseOrder_1.PurchaseOrder,
                    Post_1.Post,
                    PickupTemplate_1.PickupTemplate,
                    Password_1.Password,
                    Address_1.Address,
                    Aftersale_1.Aftersale,
                    Album_1.Album,
                    AlbumPic_1.AlbumPic,
                    AlipayConfig_1.AlipayConfig,
                    Area_1.Area,
                    Article_1.Article,
                    Auction_1.Auction,
                    AuctionActivity_1.AuctionActivity,
                    Brand_1.Brand,
                    BuyerReceiveAddress_1.BuyerReceiveAddress,
                    CardBaseInfo_1.CardBaseInfo,
                    CardDateInfo_1.CardDateInfo,
                    CardOfferBaseInfo_1.CardOfferBaseInfo,
                    CardTextImageList_1.CardTextImageList,
                    CardTimeLimit_1.CardTimeLimit,
                    CartItem_1.CartItem,
                    CashCard_1.CashCard,
                    CashCardOffer_1.CashCardOffer,
                    Category_1.Category,
                    Conf_1.Conf,
                    Consume_1.Consume,
                    MultipartFile_1.MultipartFile,
                    GoodsCategory_1.GoodsCategory,
                    '*/entity/*.ts',
                    '*/module/*/model/*.ts',
                ],
            },
        },
    },
    /**
     * 文件上传配置
     */
    upload: {
        // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
        mode: 'file',
        // fileSize: string, 最大上传文件大小，默认为 10mb
        fileSize: '10mb',
        // whitelist: string[]，文件扩展名白名单
        whitelist: [
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.bmp',
            '.wbmp',
            '.webp',
            '.svg',
            '.xml',
            '.pdf',
            '.zip',
            '.gz',
            '.gzip',
            '.rar',
            '.doc',
            '.docx',
            '.xls',
            '.xlsx',
            '.rtf',
            '.pptx',
            '.ppt',
            '.wps',
            '.txt',
        ],
        // tmpdir: string，上传的文件临时存储路径
        tmpdir: (0, path_1.join)((0, os_1.tmpdir)(), 'midway-upload-files'),
        // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
        cleanTimeout: 5 * 60 * 1000,
    },
    /**
     * 视图配置
     */
    view: {
        defaultExtension: '.ejs',
        mapping: {
            '.ejs': 'ejs',
        },
    },
    // ejs config
    ejs: {},
    /**
     * 域名配置
     */
    domain: {
        // yiping
        domainName: 'test.zero9.work',
    },
    /**
     * Passport配置
     */
    passport: {
        session: false,
    },
    /**
     * JWT配置
     */
    jwt: {
        secret: 'yiping',
        expiresIn: '999999d', // https://github.com/vercel/ms
    },
    /**
     * CORS配置
     */
    cors: {
        // origin: '*',
        credentials: true,
    },
    redis: {
        client: {
            port: 6379,
            host: "localhost",
            password: "",
            db: 0,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHNCQUFzQjtBQUN0QiwrQkFBNEI7QUFDNUIsMkJBQTRCO0FBRTVCLFVBQVU7QUFDViwyQ0FBd0M7QUFDeEMscURBQWtEO0FBQ2xELG1EQUFnRDtBQUNoRCwyQ0FBd0M7QUFDeEMseUNBQXNDO0FBQ3RDLHFEQUFrRDtBQUNsRCxtREFBZ0Q7QUFDaEQsdURBQW9EO0FBQ3BELHlEQUFzRDtBQUN0RCx1REFBb0Q7QUFDcEQsdURBQW9EO0FBQ3BELHVEQUFvRDtBQUNwRCx1Q0FBb0M7QUFDcEMsNkNBQTBDO0FBQzFDLG1EQUFnRDtBQUNoRCwyQ0FBd0M7QUFDeEMsMkNBQXdDO0FBQ3hDLGlEQUE4QztBQUM5QywrQ0FBNEM7QUFDNUMsNkNBQTBDO0FBQzFDLDJEQUF3RDtBQUN4RCwyREFBd0Q7QUFDeEQsK0VBQTRFO0FBQzVFLDJDQUF3QztBQUN4Qyx1REFBb0Q7QUFDcEQsdURBQW9EO0FBQ3BELHlDQUFzQztBQUN0QyxtRUFBZ0U7QUFDaEUsMkRBQXdEO0FBQ3hELHlDQUFzQztBQUN0Qyw2REFBMEQ7QUFDMUQsaURBQThDO0FBQzlDLCtDQUE0QztBQUM1QyxtREFBZ0Q7QUFDaEQsMkNBQXdDO0FBQ3hDLGlEQUE4QztBQUM5Qyx5REFBc0Q7QUFDdEQseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QywrQ0FBNEM7QUFDNUMsK0RBQTREO0FBQzVELDJDQUF3QztBQUN4Qyx1RUFBb0U7QUFDcEUseURBQXNEO0FBQ3RELHlEQUFzRDtBQUN0RCxtRUFBZ0U7QUFDaEUsbUVBQWdFO0FBQ2hFLDJEQUF3RDtBQUN4RCxpREFBOEM7QUFDOUMsaURBQThDO0FBQzlDLDJEQUF3RDtBQUN4RCxpREFBOEM7QUFDOUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QywyREFBd0Q7QUFDeEQsMkRBQXdEO0FBQ3hELHNEQUFtRDtBQUVuRDs7O0dBR0c7QUFDSCxrQkFBZTtJQUNiLDhCQUE4QjtJQUM5QixJQUFJLEVBQUUsb0JBQW9CO0lBRTFCOztPQUVHO0lBQ0gsR0FBRyxFQUFFO1FBQ0gsYUFBYTtRQUNiLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUztRQUNULFlBQVksRUFBRSxNQUFNO0tBQ3JCO0lBRUQ7O09BRUc7SUFDSCxPQUFPLEVBQUU7UUFDUCxVQUFVLEVBQUU7WUFDVixPQUFPLEVBQUU7Z0JBQ1A7O21CQUVHO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixXQUFXLEVBQUUsS0FBSztnQkFDbEIsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsU0FBUztnQkFDVCxRQUFRLEVBQUU7b0JBQ1IsV0FBSTtvQkFDSixhQUFLO29CQUNMLHVCQUFVO29CQUNWLHFCQUFTO29CQUNULGFBQUs7b0JBQ0wsV0FBSTtvQkFDSix1QkFBVTtvQkFDVixxQkFBUztvQkFDVCx5QkFBVztvQkFDWCwyQkFBWTtvQkFDWix5QkFBVztvQkFDWCx1QkFBVTtvQkFDVix5QkFBVztvQkFDWCx5QkFBVztvQkFDWCxTQUFHO29CQUNILGVBQU07b0JBQ04scUJBQVM7b0JBQ1QsYUFBSztvQkFDTCxhQUFLO29CQUNMLG1CQUFRO29CQUNSLGlCQUFPO29CQUNQLGVBQU07b0JBQ04sNkJBQWE7b0JBQ2IsNkJBQWE7b0JBQ2IscUJBQVM7b0JBQ1QsaURBQXVCO29CQUN2QixhQUFLO29CQUNMLHlCQUFXO29CQUNYLHlCQUFXO29CQUNYLFdBQUk7b0JBQ0oscUNBQWlCO29CQUNqQiw2QkFBYTtvQkFDYixXQUFJO29CQUNKLCtCQUFjO29CQUNkLG1CQUFRO29CQUNSLGlCQUFPO29CQUNQLHFCQUFTO29CQUNULGFBQUs7b0JBQ0wsbUJBQVE7b0JBQ1IsMkJBQVk7b0JBQ1osV0FBSTtvQkFDSixpQkFBTztvQkFDUCxpQkFBTztvQkFDUCxpQ0FBZTtvQkFDZixhQUFLO29CQUNMLHlDQUFtQjtvQkFDbkIsMkJBQVk7b0JBQ1osMkJBQVk7b0JBQ1oscUNBQWlCO29CQUNqQixxQ0FBaUI7b0JBQ2pCLDZCQUFhO29CQUNiLG1CQUFRO29CQUNSLG1CQUFRO29CQUNSLDZCQUFhO29CQUNiLG1CQUFRO29CQUNSLFdBQUk7b0JBQ0osaUJBQU87b0JBQ1AsNkJBQWE7b0JBQ2IsNkJBQWE7b0JBQ2IsZUFBZTtvQkFDZix1QkFBdUI7aUJBQ3hCO2FBQ0Y7U0FDRjtLQUNGO0lBRUQ7O09BRUc7SUFDSCxNQUFNLEVBQUU7UUFDTixxREFBcUQ7UUFDckQsSUFBSSxFQUFFLE1BQU07UUFDWixzQ0FBc0M7UUFDdEMsUUFBUSxFQUFFLE1BQU07UUFDaEIsK0JBQStCO1FBQy9CLFNBQVMsRUFBRTtZQUNULE1BQU07WUFDTixPQUFPO1lBQ1AsTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLE9BQU87WUFDUCxNQUFNO1lBQ04sTUFBTTtZQUNOLE9BQU87WUFDUCxNQUFNO1lBQ04sT0FBTztZQUNQLE1BQU07WUFDTixPQUFPO1lBQ1AsTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1NBQ1A7UUFDRCw2QkFBNkI7UUFDN0IsTUFBTSxFQUFFLElBQUEsV0FBSSxFQUFDLElBQUEsV0FBTSxHQUFFLEVBQUUscUJBQXFCLENBQUM7UUFDN0Msb0RBQW9EO1FBQ3BELFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUk7S0FDNUI7SUFFRDs7T0FFRztJQUNILElBQUksRUFBRTtRQUNKLGdCQUFnQixFQUFFLE1BQU07UUFDeEIsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLEtBQUs7U0FDZDtLQUNGO0lBRUQsYUFBYTtJQUNiLEdBQUcsRUFBRSxFQUFFO0lBRVA7O09BRUc7SUFDSCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsVUFBVSxFQUFFLGlCQUFpQjtLQUM5QjtJQUVEOztPQUVHO0lBQ0gsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUVEOztPQUVHO0lBQ0gsR0FBRyxFQUFFO1FBQ0gsTUFBTSxFQUFFLFFBQVE7UUFDaEIsU0FBUyxFQUFFLFNBQVMsRUFBRSwrQkFBK0I7S0FDdEQ7SUFFRDs7T0FFRztJQUNILElBQUksRUFBRTtRQUNKLGVBQWU7UUFDZixXQUFXLEVBQUUsSUFBSTtLQUNsQjtJQUVELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLFdBQVc7WUFDakIsUUFBUSxFQUFFLEVBQUU7WUFDWixFQUFFLEVBQUUsQ0FBQztTQUNOO0tBQ0Y7Q0FFYyxDQUFDIn0=