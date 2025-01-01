import { Provide } from '@midwayjs/decorator';
import { BaseService } from '../../common/service/base.service';
import _ = require('lodash');

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleCredentials } from '../../../entity/GoogleCredentials';

const objUtils: any = require('../../common/utils/objUtils');

@Provide()
export class CredentialsService extends BaseService {

  // 查询的数据库表名称
  private static TABLE_NAME = 'google_credentials';

    @InjectEntityModel(GoogleCredentials)
    private repository: Repository<GoogleCredentials> = null;


    public async update(obj: GoogleCredentials): Promise<GoogleCredentials> {
        // 一个表进行操作 typeORM
 
        let log = '';

        // 如果googleId已存在，则返回这个googleId对应的数据

        const sql = ` SELECT t.* FROM google_credentials t WHERE t.google_id = '${obj.googleId}' `

        const results = await super.query?.(sql)

        if (results && results.length > 0) {

            return objUtils?.camelCase?.(_?.head?.(results))

        }

        if (!obj?.id) {

            console.log('obj?.id is empty');

            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供'

            delete obj?.id

            await this?.repository?.save?.(obj) // insert update

            if (!obj?.orderNum) {
                await super.sortOrder?.(obj?.id, null, null, CredentialsService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
            }
            return null
        }

        let old: GoogleCredentials = await this?.repository?.findOneById?.(obj?.id) // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改

        console.log('old: ' + JSON.stringify(old));

        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供

            console.log(JSON.stringify(obj));

            await this?.repository?.save?.(obj) // insert update

            if (!obj?.orderNum) {
                await super.sortOrder?.(obj?.id, null, null, CredentialsService?.TABLE_NAME, ) // 新增数据时，设置此条数据的orderNum排序值
            }
            return null
        }
        delete obj?.id

        old = {
            ...old,

            ...obj,
        }

        console.log(log);

        await this?.repository?.save?.(old) // 修改数据
    }

}
