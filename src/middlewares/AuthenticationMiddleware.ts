// import { Middleware, Next, Req, Res } from "@tsed/common";
// import jwt from "jsonwebtoken";
// import { SECRET_KEY } from "src/config/config";

// @Middleware()
// export class AuthenticationMiddleware {
//   use(@Req() req: Req, @Res() res: Res, @Next() next: Next) {
//     const token = req.header("Authorization");
//     if (!token) {
//       console.error("Access denied. Token not provided");
//       return res.status(401).send("Access denied. Token not provided.");
//     }

//     jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
//       if (err) {
//         console.error("Invalid token:", err.message)
//         return res.status(403).send("Invalid token.");
//       }

//       req.user = user;
//       next();
//     });
//   }
// }
