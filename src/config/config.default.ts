// 导入MidwayConfig类型
import { MidwayConfig } from "@midwayjs/core";

// 导入Node.js的path和os模块
import { join } from "path";
import { tmpdir } from "os";

// 导入各种实体类
import { Buyer } from "../entity/Buyer";
import { UserOpenId } from "../entity/UserOpenId";
import { ShopBuyer } from "../entity/ShopBuyer";
import { Goods } from "../entity/Goods";
import { Shop } from "../entity/Shop";
import { TradeOrder } from "../entity/TradeOrder";
import { OrderItem } from "../entity/OrderItem"; 
import { UserRoleMap } from "../entity/UserRoleMap";
import { TagListUser } from "../entity/TagListUser";
import { TagGoodsMap } from "../entity/TagGoodsMap";
import { Tag } from "../entity/Tag";
import { Tabbar } from "../entity/Tabbar";
import { SysParams } from "../entity/SysParams";
import { Stock } from "../entity/Stock";
import { Staff } from "../entity/Staff";
import { SkuValue } from "../entity/SkuValue";
import { SkuList } from "../entity/SkuList";
import { SkuKey } from "../entity/SkuKey";
import { ShopWxUserMap } from "../entity/ShopWxUserMap";
import { ShopSellerMap } from "../entity/ShopSellerMap";
import { SellerBuyMallMemberCard } from "../entity/SellerBuyMallMemberCard";
import { Route } from "../entity/Route";
import { RoleMenuMap } from "../entity/RoleMenuMap";
import { RoleDeptMap } from "../entity/RoleDeptMap";
import { Role } from "../entity/Role";
import { PurchaseOrderItem } from "../entity/PurchaseOrderItem";
import { PurchaseOrder } from "../entity/PurchaseOrder";
import { Post } from "../entity/Post";
import { PickupTemplate } from "../entity/PickupTemplate";
import { Password } from "../entity/Password";
import { Address } from "../entity/Address";
import { Aftersale } from "../entity/Aftersale";
import { Album } from "../entity/Album";
import { AlbumPic } from "../entity/AlbumPic";
import { AlipayConfig } from "../entity/AlipayConfig";
import { Area } from "../entity/Area";
import { Article } from "../entity/Article";
import { Auction } from "../entity/Auction";
import { AuctionActivity } from "../entity/AuctionActivity";
import { Brand } from "../entity/Brand";
import { BuyerReceiveAddress } from "../entity/BuyerReceiveAddress";
import { CardBaseInfo } from "../entity/CardBaseInfo";
import { CardDateInfo } from "../entity/CardDateInfo";
import { CardOfferBaseInfo } from "../entity/CardOfferBaseInfo";
import { CardTextImageList } from "../entity/CardTextImageList";
import { CardTimeLimit } from "../entity/CardTimeLimit";
import { CartItem } from "../entity/CartItem";
import { CashCard } from "../entity/CashCard";
import { CashCardOffer } from "../entity/CashCardOffer";
import { Category } from "../entity/Category";
import { Conf } from "../entity/Conf";
import { Consume } from "../entity/Consume";
import { MultipartFile } from "../entity/MultipartFile";
import { GoodsCategory } from "../entity/GoodsCategory"; 
import { BatchesTransfer } from "../entity/BatchesTransfer";
import { CreateProfitSharingOrdersReceivers } from "../entity/CreateProfitSharingOrdersReceivers";
import { DeliveryCompany } from "../entity/DeliveryCompany";
import { DeliveryList } from "../entity/DeliveryList";
import { DeliveryTemplateGlobal } from "../entity/DeliveryTemplateGlobal";
import { DeliveryTemplateLocale } from "../entity/DeliveryTemplateLocale";
import { Dept } from "../entity/Dept";
import { DiscountCard } from "../entity/DiscountCard";
import { DiscountCardOffer } from "../entity/DiscountCardOffer";
import { Dlg } from "../entity/Dlg";
import { Factory } from "../entity/Factory";
import { Favor } from "../entity/Favor";
import { Form } from "../entity/Form";
import { FormSubmit } from "../entity/FormSubmit";
import { GeneralCouponCard } from "../entity/GeneralCouponCard";
import { GiftCard } from "../entity/GiftCard";
import { GiftCardOffer } from "../entity/GiftCardOffer";
import { GoodsMessage } from "../entity/GoodsMessage";
import { GoodsPropertiesKey } from "../entity/GoodsPropertiesKey";
import { GoodsPropertiesValue } from "../entity/GoodsPropertiesValue";
import { GoodsProps } from "../entity/GoodsProps";
import { GoogleCredentials } from "../entity/GoogleCredentials";
import { GrouponCard } from "../entity/GrouponCard";
import { GrouponCardOffer } from "../entity/GrouponCardOffer";
import { Inbill } from "../entity/Inbill";
import { InbillItem } from "../entity/InbillItem";
import { Inventory } from "../entity/Inventory";
import { InviteCode } from "../entity/InviteCode"; 
import { JobLog } from "../entity/JobLog";
import { LatestBid } from "../entity/LatestBid";
import { Mall } from "../entity/Mall";
import { Material } from "../entity/Material";
import { MemberCard } from "../entity/MemberCard";
import { MemberCardOffer } from "../entity/MemberCardOffer";
import { MemberCardOfferConsume } from "../entity/MemberCardOfferConsume";
import { MenuFormMap } from "../entity/MenuFormMap";
import { MobileModule } from "../entity/MobileModule";
import { Notice } from "../entity/Notice";
import { OperationLog } from "../entity/OperationLog";
import { OrderComment } from "../entity/OrderComment";
import { OrderItemConsume } from "../entity/OrderItemConsume";
import { Org } from "../entity/Org";
import { Outbill } from "../entity/Outbill";
import { OutbillItem } from "../entity/OutbillItem";
import { PageView } from "../entity/PageView";
import { ProfitSharing } from "../entity/ProfitSharing";
import { SignIn } from "../entity/SignIn";
import { SignInDay } from "../entity/SignInDay";
import { TimeRes } from "../entity/TimeRes";
import { TimeResJob } from "../entity/TimeResJob";
import { TimeResJobWork } from "../entity/TimeResJobWork";
import { TransferDetailList } from "../entity/TransferDetailList";
import { Job } from "../entity/Job";
import { WxPayConfig } from "../entity/WxPayConfig";
import { Withdrawal } from "../entity/Withdrawal";
import { WechatConfig } from "../entity/WechatConfig";
import { User } from "../module/common/model/User";

/**
 * 默认配置文件
 * 定义了应用程序的各种配置选项
 */
export default {
  // 用于Cookie签名的密钥，应该更改为自己的并保持安全
  keys: "1650944839830_1213",

  /**
   * Koa框架配置
   */
  koa: {
    // 应用程序监听的端口号
    port: 7098,
    // 全局路由前缀
    globalPrefix: "/api",
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
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "aaaa1111",
        database: "test",
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: true,
        // 或者扫描形式
        entities: [
          Address,
          Aftersale,
          Album,
          AlbumPic,
          AlipayConfig,
          Area,
          Article,
          Auction,
          AuctionActivity,
          BatchesTransfer,
          Brand,
          Buyer,
          BuyerReceiveAddress,
          CardBaseInfo,
          CardDateInfo,
          CardOfferBaseInfo,
          CardTextImageList,
          CardTimeLimit,
          CartItem,
          CashCard,
          CashCardOffer,
          Category, 
          Conf,
          Consume,
          CreateProfitSharingOrdersReceivers,
          DeliveryCompany,
          DeliveryList,
          DeliveryTemplateGlobal,
          DeliveryTemplateLocale,
          Dept,
          DiscountCard,
          DiscountCardOffer,
          Dlg,
          Factory,
          Favor,
          Form,
          FormSubmit,
          GeneralCouponCard,
          GiftCard,
          GiftCardOffer,
          Goods,
          GoodsCategory,
          GoodsMessage,
          GoodsPropertiesKey,
          GoodsPropertiesValue,
          GoodsProps,
          GoogleCredentials,
          GrouponCard,
          GrouponCardOffer,
          Inbill,
          InbillItem,
          Inventory,
          InviteCode,
          Job,
          JobLog,
          LatestBid,
          Mall,
          Material,
          MemberCard,
          MemberCardOffer,
          MemberCardOfferConsume,
          MenuFormMap,
          MobileModule,
          MultipartFile,
          Notice,
          OperationLog,
          OrderComment,
          OrderItem,
          OrderItemConsume,
          Org,
          Outbill,
          OutbillItem,
          PageView,
          Password,
          PickupTemplate,
          Post,
          ProfitSharing,
          PurchaseOrder,
          PurchaseOrderItem,
          Role,
          RoleDeptMap,
          RoleMenuMap,
          Route,
          SellerBuyMallMemberCard,
          Shop,
          ShopBuyer,
          ShopSellerMap,
          ShopWxUserMap,
          SignIn,
          SignInDay,
          SkuKey,
          SkuList,
          SkuValue,
          Staff,
          Stock,
          SysParams,
          Tabbar,
          Tag,
          TagGoodsMap,
          TagListUser,
          TimeRes,
          TimeResJob,
          TimeResJobWork,
          TradeOrder,
          TransferDetailList,
          UserOpenId,
          UserRoleMap,
          WechatConfig,
          Withdrawal,
          WxPayConfig,
          User,
          "*/entity/*.ts",
          "*/module/*/model/*.ts",
        ],
      },
    },
  },

  /**
   * 文件上传配置
   */
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: "file",
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: "10mb",
    // whitelist: string[]，文件扩展名白名单
    whitelist: [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".wbmp",
      ".webp",
      ".svg",
      ".xml",
      ".pdf",
      ".zip",
      ".gz",
      ".gzip",
      ".rar",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".rtf",
      ".pptx",
      ".ppt",
      ".wps",
      ".txt",
    ],
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(tmpdir(), "midway-upload-files"),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 5 * 60 * 1000,
  },

  /**
   * 视图配置
   */
  view: {
    defaultExtension: ".ejs",
    mapping: {
      ".ejs": "ejs",
    },
  },

  // ejs config
  ejs: {},

  /**
   * 域名配置
   */
  domain: {
    // yiping
    domainName: "test.zero9.work",
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
    secret: "yiping", // fs.readFileSync('xxxxx.key')
    expiresIn: "999999d", // https://github.com/vercel/ms
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
      port: 6379, // Redis port
      host: "localhost", // Redis host
      password: "",
      db: 0,
    },
  },
} as MidwayConfig;
