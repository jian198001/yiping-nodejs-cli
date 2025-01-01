import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class GoogleCredentials extends BaseModel {

    @Column({nullable: true, comment: '', name: 'account_name',})
    public accountName: string  

    @Column({nullable: true, comment: '', name: 'display_name',})
    public  displayName: string  

    @Column({nullable: true, comment: '', name: '',})
    public  email: string  

    @Column({nullable: true, comment: '', name: 'family_name',})
    public  familyName: string  

    @Column({nullable: true, comment: '', name: 'given_name',})
    public  givenName: string  

    @Column({nullable: true, comment: '', name: 'google_id',})
    public  googleId: string  

    @Column({nullable: true, comment: '', name: 'photo_url',})
    public  photoUrl: string 
  
}
