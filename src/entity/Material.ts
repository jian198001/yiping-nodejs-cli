import {ApiProperty,} from "@midwayjs/swagger"
import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 商品实体类
 * 用于表示商品的基本信息
 */
@Entity()
export class Material extends BaseModel {
  /**
   * 商品质量
   * 商品的质量，默认单位为克
   */
  @Column({nullable: true, comment: '', name: 'mass', type: 'double',})
  @ApiProperty({description: '商品质量,默认为克',})
  public mass: number  
  
  /**
   * 增价拍封顶价
   * 增价拍的封顶价格，不设置表示无封顶价，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'ceil_price', type: 'double',})
  @ApiProperty({description: '增价拍封顶价，不设置表示无封顶价,标识符名称来自淘宝开放平台',})
  public ceilPrice: number  
  
  /**
   * 物流类型
   * 商品的物流类型，可选值为delivery（需物流）或eticket（电子兑换券-自动生成券码，线下到店核销，无需备货），默认值为eticket
   */
  @Column({nullable: true, comment: '', name: 'delivery',})
  @ApiProperty({description: '物流类型：delivery->需物流;eticket->电子兑换券-自动生成券码,线下到店核销,无需备货;默认值:eticket(电子兑换券-自动生成券码,线下到店核销,无需备货)',})
  public delivery: string = 'eticket';
  
  /**
   * 库存预警值
   * 商品的库存预警值，默认值为50
   */
  @Column({nullable: true, comment: '', name: 'low_stock',})
  @ApiProperty({description: '库存预警值,默认值50',})
  public lowStock: number = 50;
  
  /**
   * 商品所在地-国家
   * 商品所在地的国家，标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'country',})
  @ApiProperty({description: '商品所在地-国家,标识符名称来自微信小店',})
  public country: string  
  
  /**
   * 运费承担方式
   * 商品的运费承担方式，可选值为shop（卖家承担）或buyer（买家承担），默认值为shop
   */
  @Column({nullable: true, comment: '', name: 'freight_payer',})
  @ApiProperty({description: '运费承担方式。可选值:shop（卖家承担）,buyer(买家承担);默认值:shop。卖家承担不用设置邮费和postage_id.买家承担的时候,必填邮费和postage_id 如果用户设置了运费模板会优先使用运费模板,否则要同步设置邮费（post_fee,express_fee,ems_fee）',})
  public freightPayer: string = 'seller';
  
  /**
   * 体积-高度
   * 商品的体积高度，单位为米
   */
  @Column({nullable: true, comment: '', name: 'height', type: 'double',})
  @ApiProperty({description: '体积-高度(米)',})
  public height: number  
  
  /**
   * 保证金金额
   * 商品的保证金金额，单位为元，大于100，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'freeze_amount', type: 'double',})
  @ApiProperty({description: '保证金金额(元),大于100,标识符名称来自淘宝开放平台',})
  public freezeAmount: number  
  
  /**
   * 商品所在地-省
   * 商品所在地的省份，标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'province',})
  @ApiProperty({description: '商品所在地-省,标识符名称来自微信小店',})
  public province: string  
  
  /**
   * 运费模板全局ID
   * 商品的运费模板全局ID
   */
  @Column({nullable: true, comment: '', name: 'delivery_template_global_id',})
  public deliveryTemplateGlobalId: string  
  
  /**
   * 商品分类ID
   * 商品所属的分类ID
   */
  @Column({nullable: true, comment: '', name: 'material_category_id',})
  public materialCategoryId: string  
  
  /**
   * 商品是否支持下单减库存
   * 商品是否支持下单减库存，可选值为order（支持）、pay（取消支持，付款减库存）或delivery（出库减库存，电子凭证的话，下单即出库），默认值为order
   */
  @Column({nullable: true, comment: '', name: 'sub_stock',})
  @ApiProperty({description: '商品是否支持下单减库存:order支持;pay取消支持(付款减库存);delivery.出库减库存(电子凭证的话,下单即出库).默认值:2(付款减库存)。下单减库存：买家拍下商品即减少库存,存在恶拍风险,热销商品如需避免超卖可选此方式。付款减库存：买家拍下并完成付款方可减少库存,存在超卖风险,如需减少恶拍,提高汇款效率,可选此方式。发货减库存：卖家发货时减库存,如果库存充实,需要确保线上库存与线下库存保持一致,可选此方式',})
  public subStock: string = 'order';
  
  /**
   * 市场价
   * 商品的市场价，标识符名称来自有赞
   */
  @Column({nullable: true, comment: '', name: 'origin_price', type: 'double',})
  @ApiProperty({description: '市场价,标识符名称来自有赞',})
  public originPrice: number  
  
  /**
   * 商品体积
   * 商品的体积，支持两种格式设置：bulk:3（单位为立方米）或length:10;breadth:10;height:10（单位为米）
   */
  @Column({nullable: true, comment: '', name: 'item_size',})
  @ApiProperty({description: '表示商品的体积,如果需要使用按体积计费的运费模板,一定要设置这个值。该值的单位为立方米（m3）,如果是其他单位,请转换成成立方米。该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）。体积和长宽高都支持小数类型。在传入体积或长宽高时候,不能带单位。体积的单位默认为立方米（m3）,长宽高的单位默认为米(m)该值支持两种格式的设置：格式1：bulk:3,单位为立方米(m3),表示直接设置为商品的体积。格式2：length:10;breadth:10;height:10,单位为米（m）',})
  public itemSize: string  
  
  /**
   * 品牌名称
   * 商品的品牌名称
   */
  @Column({nullable: true, comment: '', name: 'brand_name',})
  @ApiProperty({description: '品牌名称',})
  public brandName: string  
  
  /**
   * 是否能单独销售
   * 商品是否能单独销售，1表示是，0表示否，如果不能单独销售，则只能作为某商品的配件或者赠品销售
   */
  @Column({nullable: true, comment: '', name: 'alone_sale',})
  @ApiProperty({description: '是否能单独销售,1,是；0,否；如果不能单独销售,则只能作为某商品的配件或者赠品销售',})
  public aloneSale: string  
  
  /**
   * 拍卖状态
   * 商品的拍卖状态，可选值为0（即将开始）、1（正在进行）、2（竞买成功，等待法院确认）、4（流拍，等待法院确认）、5（法院确认成交）、6（法院确认流拍）、7（撤回）、8（中止）、10（交易未履行）、3（其他），标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'auction_status',})
  @ApiProperty({description: '拍卖状态,0=即将开始;1=正在进行;2=竞买成功，等待法院确认;4=流拍,等待法院确认;5=法院确认成交;6=法院确认流拍;7=撤回;8=中止;10=交易未履行;3=其他;,标识符名称来自淘宝开放平台',})
  public auctionStatus: string  
  
  /**
   * 商品价格和商品价格阶梯明细信息，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'price', type: 'double',})
  public price: number  
  
  /**
   * 降价拍专用，表示底价
   * 标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'floor_price', type: 'double',})
  @ApiProperty({description: '降价拍专用，表示底价,标识符名称来自淘宝开放平台',})
  public floorPrice: number  
 
  /**
   * 品牌ID，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'brand_id',})
  public brandId: string  
  
  /**
   * 标题，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'title',})
  @ApiProperty({description: '标题。不能超过30字符,受违禁词控制',})
  public title: string 
  
  /**
   * 体积-长度(米)
   */
  @Column({nullable: true, comment: '', name: 'length', type: 'double',})
  @ApiProperty({description: '体积-长度(米)',})
  public length: number  
  
  /**
   * 是否支持退换货
   * 标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'support_replace',})
  @ApiProperty({description: '是否支持退换货,标识符名称来自微信小店',})
  public supportReplace: string  
  
  /**
   * 重复上拍次数
   * 默认为0，0表示不自动重新上架,标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'repeat_times',})
  @ApiProperty({description: '重复上拍次数,默认为0，0表示不自动重新上架,标识符名称来自淘宝开放平台',})
  public repeatTimes: number  
  
  /**
   * 运费模板本地计价方式
   */
  @Column({nullable: true, comment: '', name: 'delivery_template_locale_valuation',})
  public deliveryTemplateLocaleValuation: string  
  
  /**
   * 店铺ID，标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'shop_id',})
  public shopId: string  
  
  /**
   * 商品条形码
   */
  @Column({nullable: true, comment: '', name: 'barcode',})
  @ApiProperty({description: '商品条形码',})
  public barcode: string  
  
  /**
   * 副标题
   */
  @Column({nullable: true, comment: '', name: 'sub_title',})
  @ApiProperty({description: '副标题',})
  public subTitle: string  
  
  /**
   * 商品所在地-地址
   * 标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'address',})
  @ApiProperty({description: '商品所在地-地址,标识符名称来自微信小店',})
  public address: string  
  
  /**
   * 评估价
   * 标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'consult_price', type: 'double',})
  @ApiProperty({description: '评估价,标识符名称来自淘宝开放平台',})
  public consultPrice: number  
  
  /**
   * 运费模板本地名称
   */
  @Column({nullable: true, comment: '', name: 'delivery_template_locale_name',})
  public deliveryTemplateLocaleName: string  
  
  /**
   * 商品分类名称
   */
  @Column({nullable: true, comment: '', name: 'material_category_name',})
  @ApiProperty({description: '商品分类名称',})
  public materialCategoryName: string  
  
  /**
   * 货号
   */
  @Column({nullable: true, comment: '', name: 'material_sn',})
  @ApiProperty({description: '货号',})
  public materialSn: string  
  
  /**
   * 限购数
   * 0表示不限购,默认值为0,标识符名称来自有赞
   */
  @Column({nullable: true, comment: '', name: 'quota',})
  @ApiProperty({description: '限购数,0表示不限购,默认值为0,标识符名称来自有赞',})
  public quota: number = 1000000000;
  
  /**
   * 收藏ID
   */
  @Column({nullable: true, comment: '', name: 'collection_id',})
  public collectionId: string  
  
  /**
   * 起售数量
   * 默认值为1,标识符名称来自有赞
   */
  @Column({nullable: true, comment: '', name: 'start_sale_num', type: 'double', })
  @ApiProperty({description: '起售数量,默认值为1,标识符名称来自有赞',})
  public startSaleNum: number = 1;
  
  /**
   * 商品新旧程度
   * 5:全新，6：二手，8:闲置,标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'stuff_status',})
  @ApiProperty({description: '商品新旧程度：5:全新，6：二手，8:闲置,标识符名称来自淘宝开放平台',})
  public stuffStatus: string  
  
  /**
   * 联系人姓名
   * 最多30个字符,标识符名称来自淘宝开放平台
   */
  @Column({nullable: true, comment: '', name: 'link_man',})
  @ApiProperty({description: '联系人姓名,最多30个字符,标识符名称来自淘宝开放平台',})
  public linkMan: string  
  
  /**
   * 库存
   */
  @Column({nullable: true, comment: '', name: 'stock',})
  @ApiProperty({description: '库存',})
  public stock: number  
  
  /**
   * 单位
   * 默认值:件
   */
  @Column({nullable: true, comment: '', name: 'unit',})
  @ApiProperty({description: '单位,默认值:件',})
  public unit: string = '件';
  
  /**
   * 商品所在地-城市
   * 标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'city',})
  @ApiProperty({description: '商品所在地-城市,标识符名称来自微信小店',})
  public city: string  
  
  /**
   * 运费模板本地ID
   */
  @Column({nullable: true, comment: '', name: 'delivery_template_locale_id',})
  public deliveryTemplateLocaleId: string  
  
  /**
   * 商品上传后的状态
   * 可选值:onsale(出售中),instock(仓库中);默认值:instock
   */
  @Column({nullable: true, comment: '', name: 'approve_status',})
  @ApiProperty({description: '商品上传后的状态。可选值:onsale(出售中),instock(仓库中);默认值:instock',})
  public approveStatus: string = "instock";
  
  /**
   * 体积-宽度(米)
   */
  @Column({nullable: true, comment: '', name: 'breadth', type: 'double',})
  @ApiProperty({description: '体积-宽度(米)',})
  public breadth: number  
  
  /**
   * SKU
   */
  @Column({nullable: true, comment: '', name: 'sku',})
  public sku: string
  
  /**
   * 是否保修
   * 标识符名称来自微信小店
   */
  @Column({nullable: true, comment: '', name: 'under_guaranty',})
  @ApiProperty({description: '是否保修,标识符名称来自微信小店',})
  public underGuaranty: string  
  
  /**
   * 宝贝描述
   * 字数要大于5个字符，小于25000个字符，受违禁词控制
   */
  @Column({nullable: true, comment: '', type: 'datetime',})
  @ApiProperty({description: '失效日期',})
  public exp: any = null
  
  /**
   * 生产厂家
   */
  @Column({nullable: true, comment: '', name: 'factory_id',})
  @ApiProperty({description: '生产厂家',})
  public factoryId: string 
  
}
