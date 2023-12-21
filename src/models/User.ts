import { Configuration } from "@tsed/di";
import {Property} from "@tsed/schema";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Repository, getRepository} from 'typeorm';

@Entity()
export class User {
    // @Property()
    @PrimaryGeneratedColumn()
    id: number;

    @Property()
    @Column({ nullable: true})
    username: string;

    @Property()
    @Column({ nullable: true })
    email: string;

    @Property()
    @Column({ nullable: true })
    password: string

    @Property()
    @Column({ nullable: true })
    address: string;

    @Property()
    @Column({ nullable: true })
    age: number;

    @Property()
    @Column({ name: "image" , nullable: true })
    image: string;
    maxSize: number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
    user: User;

    
}

// @Configuration({
//     passport: {
//       userInfoModel: User
//     }
// })