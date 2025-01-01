import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class MultipartFile extends BaseModel {

  @Column({nullable: true, comment: '', name: 'size', type: 'integer',})
  public size: number  

  @Column({nullable: true, comment: '', name: 'original_filename',})
  public originalFilename: string  

  @Column({nullable: true, comment: '', name: 'uri',})
  public uri: string  

  @Column({nullable: true, comment: '', name: 'ext_id',})
  public extId: string  

  @Column({nullable: true, comment: '', name: 'ext_type',})
  public extType: string  
 
  @Column({nullable: true, comment: '', name: 'cover',})
  public cover: string  

  @Column({nullable: true, comment: '', name: 'content_type',})
  public contentType: string  

}
