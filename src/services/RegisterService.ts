import { Injectable } from "@tsed/di";
import { Inject } from "@tsed/di";
import { POSTGRES_DATASOURCE } from "../datasources/PostgresDatasource"
import { DataSource } from "typeorm";
import { User }  from "../models/User";
import { UserService } from "./UserService";

@Injectable()
export class RegisterService {
    constructor(@Inject(POSTGRES_DATASOURCE) private dataSource: DataSource, @Inject(UserService) private userService: UserService) {}

async create(username: string, email: string, password: string, address: string, age: number, image: string): Promise<User> {
        
    let u: User = new User();
    u.username = username;
    u.email = email;
    password = await this.userService.hashedPassword(password)
    u.password = password;
    u.address = address;
    u.age = age;
    u.image = image;
    const user = await this.selectUser(email)
    if (user == null) {
    return await this.dataSource.getRepository(User).save(u);
} else {
    throw new Error("User exist");
}
}

async selectUser(email: string){
return await this.dataSource.getRepository(User).findOne({
    where: {
        email: email 
    }
})
}
}

function exclude(user: any, arg1: string) {
    throw new Error("Function not implemented.");
}
