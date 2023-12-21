import { Injectable } from "@tsed/di";
import { Inject } from "@tsed/di";
import { POSTGRES_DATASOURCE } from "../datasources/PostgresDatasource"
import { DataSource } from "typeorm";
import { User }  from "../models/User";


@Injectable()
export class UserService {
    constructor(@Inject(POSTGRES_DATASOURCE) private dataSource: DataSource) {}

    async getAll(): Promise<User[]> {
        return await this.dataSource.getRepository(User).find();
    }

    async login(email: string, password: string): Promise<User> {
            const user: User | null = await this.dataSource.getRepository(User).findOne({
                where : {
                    email: email
                }
            
            })
            if (user == null) {
                console.log("user not found")
                throw new Error("Username or password not found");

            }
            console.log(user);
            console.log("input password"+ password)
            const hashedPassword = await this.hashedPassword(password)
            console.log("hashed" + hashedPassword)
            if (hashedPassword != user.password) {
                throw new Error("Password invalid");
            }

            const userWithoutPassword: Partial<User> = { ...user };
            delete userWithoutPassword.password;
            return userWithoutPassword;
        }

        async hashedPassword(password: string): Promise<string> {
            const crypto = require('crypto');
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            return hashedPassword
          }

        async registerUser(userData: Partial<User>): Promise<User> {
            const userRepository = this.dataSource.getRepository(User);
            const newUser = userRepository.create(userData);
            return await userRepository.save(newUser);
          }

    // async create(id: number, username: string, email: string, password: string, address: string, age: number, image: string): Promise<any> {
    //     let u: User = new User();
    //     u.id = id;
    //     u.username = username;
    //     u.email = email;
    //     u.password = password;
    //     u.address = address;
    //     u.age = age;
    //     u.image = image;
    //     await this.dataSource.getRepository(User).save(u);
    // }
    


    // async getById(id: string, user: User): Promise<any> {
    //     return await this.dataSource.getTreeRepository(User).findOne({ where: { id } });


    // }

    // async update(id: string, user: User): Promise<any> {
    //     return await this.dataSource.getRepository(User).update(id, user);
    // }

    // async delete(id: string): Promise<any> {
    //     return await this.dataSource.getRepository(User).delete(id);
    // }
}


