// import { Controller, Get, Post, Req, Res, Next, UseBefore, PathParams } from "@tsed/common";
// import { AuthenticationMiddleware } from "src/middlewares/AuthenticationMiddleware"; // Import the middleware
// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "src/config/config";
// import { Path } from "@tsed/schema";
// import { Returns } from "@tsed/schema";
// import { AuthService } from "src/services/AuthService";



// @Controller("/auth")
// export class AuthController {
//     constructor(private authService: AuthService) {}

//     @Get("/generate-token/:userId")
//     @Returns(200, String)
//     generateToken(@PathParams("userId") userId: string): string {
//         const token = this.authService.generateToken({ userId});
//         return token;
//     }

//     @Get("/verify-token/:token")
//     @Returns(200, Object)
//     verifyToken(@PathParams("token") token: string): object | string {
//         const decoded = this.authService.verifyToken(token);
    
//         if (decoded) {
//           return decoded;
//         } else {
//           return "Invalid token";
//         }
//       }


//   @Post("/login")
//   @UseBefore(AuthenticationMiddleware)
//   async login(@Req() req: Req, @Res() res: Res) {
//     // Your login logic here
//     const { username, password } = req.body;

//     // Example: Check credentials (replace with your authentication logic)
//     if (username === "user" && password === "password") {
//       const user = { username: username };
//       const token = jwt.sign(user, SECRET_KEY);
//       res.json({ token: token });
//     } else {
//       res.status(401).send("Invalid credentials.");
//     }
//   }

//   @Get("/secure")
//   @UseBefore(AuthenticationMiddleware) // Use the authenticateToken middleware
//   async secureRoute(@Req() req: Req, @Res() res: Res) {
//     res.send(`Hello ${req.user.username}! This is a secure route.`);


//     // constructor(private authService: AuthService) {}

//     // @Get("/generate-token/:userId")
//     // @Returns(200, String)
//     // generateToken(@PathParams("userId") userId: string): string {
//     //     const token = this.authService.generateToken({ userId});
//     //     return token;
//     // }

//     // @Get("/verify-token/:token")
//     // @Returns(200, Object)
//     // verifyToken(@PathParams("token") token: string): object | string {
//     //     const decoded = this.authService.verifyToken(token);
    
//     //     if (decoded) {
//     //       return decoded;
//     //     } else {
//     //       return "Invalid token";
//     //     }
//     //   }
//   }
//   }
