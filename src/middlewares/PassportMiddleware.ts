// import { Middleware } from "@tsed/common";
// import { Request, Response, NextFunction } from "express";


// @Middleware()
// export class PassportMiddleware {
//   constructor() {
//     // Constructor logic if needed
//   }

//   // Middleware function
//   public middleware(req: Request, res: Response, next: NextFunction): void {
//     // Middleware logic
//     next();
//   }
// }

// // import {Middleware} from "@tsed/platform-middlewares";
// // import {Context} from "@tsed/platform-params";
// // import {Unauthorized} from "@tsed/exceptions";

// // @Middleware()
// // export class AcceptRolesMiddleware {
// //   use(@Context() ctx: Context) {
// //     const request = ctx.getReq();

// //     if (request.user && request.isAuthenticated()) {
// //       const roles = ctx.endpoint.get(AcceptRolesMiddleware);

// //       if (!roles.includes(request.user.role)) {
// //         throw new Unauthorized("Insufficient role");
// //       }
// //     }
// //   }
// // }