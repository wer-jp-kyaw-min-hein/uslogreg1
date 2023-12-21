import { Property, Required, Title } from "@tsed/schema";
import { User } from "src/models/User";

export class UserResponse {
    @Property()
    @Required()
    @Title("Id")
    id: number;

    @Property()
    @Required()
    @Title("Username")
    username: string;

    @Property()
    @Required()
    @Title("Email")
    email: string;

    @Property()
    @Required()
    @Title("Password")
    password: string;

    @Property()
    @Required()
    @Title("Address")
    address: string;

    @Property()
    @Required()
    @Title("Age")
    age: number;

    @Property()
    @Required()
    @Title("Image")
    image: string;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address;
        this.age = user.age;
        this.image = user.image;
    }
}