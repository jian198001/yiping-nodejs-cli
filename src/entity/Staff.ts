import { Column, Entity } from 'typeorm'; 
import { Human } from '../module/common/model/Human';

/**
 * 员工实体类
 * 继承自Human类，包含员工的基本信息和联系方式
 */
@Entity()
export class Staff extends Human {

  /**
   * 手机号码
   * 企业内必须唯一，mobile/email二者不能同时为空
   */
  @Column({
    nullable: true,
    comment: '手机号码。企业内必须唯一,mobile/email二者不能同时为空',
  })
  public mobile: string;

  /**
   * 邮箱
   * 长度6~64个字节，且为有效的email格式。企业内必须唯一，mobile/email二者不能同时为空
   */
  @Column({
    nullable: true,
    comment:
      '邮箱。长度6~64个字节,且为有效的email格式。企业内必须唯一,mobile/email二者不能同时为空',
  })
  public email: string;

  /**
   * 头像URL
   * 第三方仅通讯录应用可获取；对于非第三方创建的成员，第三方通讯录应用也不可获取
   */
  @Column({
    nullable: true,
    comment:
      '头像url。 第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
  })
  public avatar: string;

  /**
   * 头像缩略图URL
   * 第三方仅通讯录应用可获取；对于非第三方创建的成员，第三方通讯录应用也不可获取
   */
  @Column({
    nullable: true,
    comment:
      '头像缩略图url。第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
    name: 'thumb_avatar',
  })
  public thumbAvatar: string;

  /**
   * 地址
   * 长度最大128个字符
   */
  @Column({ nullable: true, comment: '地址。长度最大128个字符' })
  public address: string;

  /**
   * 成员别名
   * 长度1~32个utf8字符
   */
  @Column({ nullable: true, comment: '成员别名。长度1~32个utf8字符' })
  public alias: string;

  /**
   * 英文名
   * 可选字段
   */
  @Column({ nullable: true, comment: '', name: 'english_name' })
  public englishName: string;

  /**
   * 座机
   * 32字节以内，由纯数字或’-‘号组成
   */
  @Column({ nullable: true, comment: '座机。32字节以内,由纯数字或’-‘号组成' })
  public telephone: string;

  /**
   * 员工个人二维码
   * 扫描可添加为外部联系人（注意返回的是一个url，可在浏览器上打开该url以展示二维码）；第三方仅通讯录应用可获取；对于非第三方创建的成员，第三方通讯录应用也不可获取
   */
  @Column({
    nullable: true,
    comment:
      '员工个人二维码,扫描可添加为外部联系人(注意返回的是一个url,可在浏览器上打开该url以展示二维码)；第三方仅通讯录应用可获取；对于非第三方创建的成员,第三方通讯录应用也不可获取',
    name: 'qr_code',
  })
  public qrCode: string;
  
}
