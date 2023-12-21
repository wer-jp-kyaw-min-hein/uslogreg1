// import { Service } from "@tsed/common";
// import * as jwt from "jsonwebtoken";
// import { JwtPayload } from "jsonwebtoken";


// @Service()
// export class AuthService {
//   private secretKey: string = "happy"; // Replace with your actual secret key

//   generateToken(payload: object): string {
//     return jwt.sign(payload, this.secretKey, { expiresIn: "1h" }); // Adjust expiresIn as needed
//   }

//   verifyToken(token: string): object | string {
//     try {
//         const decoded = jwt.verify(token, this.secretKey);
//         return decoded;
//       } catch (error) {
//         console.error("Error verifying token:", error);
//         return "Invalid token";
//       }
//     }
// }
