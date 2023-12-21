import { Get, Post, Put, Delete, JsonClassStore, string, any, Required} from "@tsed/schema";
import { Next } from "@tsed/common";
import { AuthenticationMiddleware } from "src/middlewares/AuthenticationMiddleware";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "src/config/config";
import { Path } from "@tsed/schema";
import { AuthService } from "src/services/AuthService";
import { UserService } from "src/services/UserService";
import { User } from "src/models/User";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { Res } from "@tsed/common";
import { UserResponse } from "src/response/UserResponse";
import { Controller, Inject, Module, MultipartFile, PlatformMulterFile, Req, UseBefore } from "@tsed/common";
import { DataSource } from "typeorm";
import { POSTGRES_DATASOURCE } from "src/datasources/PostgresDatasource";
import {Security, Returns} from "@tsed/schema";
import { RegisterService } from "src/services/RegisterService";
// import {CustomAuth, CustomAuthMiddleware} from "src/guards/CustomAuthMiddleware";
import {Authenticate} from "@tsed/passport";


@Controller("/user")
// @CustomAuth({role: "admin", scopes: ["email"]})
export class UserController {

    constructor(@Inject(UserService) private userService: UserService, @Inject(RegisterService) private registerService: RegisterService) {}

    // @Get("/generate-token/:userId")
    // @Returns(200, String)
    // generateToken(@PathParams("userId") userId: string): string {
    //     const token = this.authService.generateToken({ userId});
    //     return token;
    // }

    // @Get("/verify-token/:token")
    // @Returns(200, Object)
    // verifyToken(@PathParams("token") token: string): object | string {
    //     const decoded = this.authService.verifyToken(token);
    
    //     if (decoded) {
    //       return decoded;
    //     } else {
    //       return "Invalid token";
    //     }
    //   }

    // @Get("/secure")
    // @UseBefore(AuthenticationMiddleware) // Use the authenticateToken middleware
    // async secureRoute(@Req() req: Req, @Res() res: Res) {
    // res.send(`Hello ${req.user.username}! This is a secure route.`);
    // }

    @Post("/login")
    @UseBefore(AuthenticationMiddleware)
        async login(
                    @Required() @BodyParams("email") email: string,
                    @Required() @BodyParams("password") password: string,
                    @Req() req: Req, @Res() res: Res
                    ) {
                        const user: User | null = await this.userService.login(email, password);
                        return {user} ;
                        }
                        // if (email === "user" && password === "password") {
                            // const user = { username: email };
                        //     const token = jwt.sign(email, SECRET_KEY);
                        //     res.json({ token: token });
                        //   } else {
                        //     res.status(401).send("Invalid credentials.");
                        //   }
                        // return { user };
                        

                        // return req.user;
                    // try {
                    //     const user: User | null = await this.userService.login(email, password);

                    //     if (user !== null) {
                    //         return { user };
                    //      } 
                    //     // else {
                    // //     return { error: "Username or password not found" };
                    // // }
                    // } catch (error) {
                    //     console.error("Error during login:", error);
                    //     return { error: "Login failed"};
                    // }
        @Post("/register")
        async create(
                    @MultipartFile("file") file: PlatformMulterFile, 
                    @BodyParams() user: User): Promise<User | { error: string }> {
            user.image = file.filename;
            try {
            const {username, email, password, address, age, image} = user;
            return await this.registerService.create(username, email, password, address, age, image);
            } catch (error) {
                console.error("Error during registration:", error);
                return { error: "Registration failed"};
            }         
        }
    }

function getErrorMessage(error: any): any {
    throw new Error("Function not implemented.");
}
function exclude(user: User, arg1: string) {
    throw new Error("Function not implemented.");
}

