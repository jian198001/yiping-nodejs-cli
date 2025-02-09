import { Provide } from "@midwayjs/decorator";
import { BaseService } from "../../common/service/base.service";
import _ = require("lodash");

import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { GoogleCredentials } from "../../../entity/GoogleCredentials";

const objUtils: any = require("../../common/utils/objUtils");

@Provide()
export class CredentialsService extends BaseService {
  // 查询的数据库表名称
  private static TABLE_NAME = "google_credentials";

  @InjectEntityModel(GoogleCredentials)
  private repository: Repository<GoogleCredentials> = null;

  /**
   * 更新或插入Google凭据
   * @param obj - 包含Google凭据信息的对象
   * @returns 更新或插入后的Google凭据对象，如果是插入操作则返回null
   */
  public async update(obj: GoogleCredentials): Promise<any> {
    // 一个表进行操作 typeORM

    let log = "";

    // 如果googleId已存在，则返回这个googleId对应的数据

    const sql = ` SELECT t.* FROM google_credentials t WHERE t.google_id = '${obj.googleId}' `;

    const results = await super.query?.(sql);

    if (results && results.length > 0) {
      // 将查询结果的第一条记录转换为驼峰命名格式并返回
      return objUtils?.camelCase?.(_?.head?.(results));
    }

    // 如果obj.id为空，说明这是一个新记录
    if (!obj?.id) {
      console?.log?.("obj?.id is empty");

      // 记录日志，表示这是一个新增数据操作，主键id由后端typeorm提供
      log = "新增数据，主键id的随机字符串值，由后端typeorm提供";

      // 删除obj中的id属性，因为这是一个新记录，不需要指定id
      delete obj?.id;

      // 调用repository.save方法插入新记录
      await this?.repository?.save?.(obj); // insert update

      // 如果obj中没有orderNum，则调用sortOrder方法设置排序值
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          CredentialsService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      // 返回null，表示插入操作成功
       return {} ;
    }

    // 如果obj.id不为空，说明这是一个更新操作
    let old: GoogleCredentials = await this?.repository?.findOneById?.(obj?.id); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

    console?.log?.("old: " + JSON?.stringify?.(old));

    // 如果查询结果为空，说明这是一个新记录
    if (!old) {
      // 记录日志，表示这是一个新增数据操作，主键id由前端页面提供
      console?.log?.(JSON?.stringify?.(obj));

      // 调用repository.save方法插入新记录
      await this?.repository?.save?.(obj); // insert update

      // 如果obj中没有orderNum，则调用sortOrder方法设置排序值
      if (!obj?.orderNum) {
        await super.sortOrder?.(
          obj?.id,
          null,
          null,
          CredentialsService?.TABLE_NAME
        ); // 新增数据时，设置此条数据的orderNum排序值
      }
      // 返回null，表示插入操作成功
       return {} ;
    }
    // 删除obj中的id属性，因为id不应该被更新
    delete obj?.id;

    // 将obj的属性合并到old对象中
    old = {
      ...old,

      ...obj,
    };

    console?.log?.(log);

    // 调用repository.save方法更新记录
    await this?.repository?.save?.(old); // 修改数据
  }
}
