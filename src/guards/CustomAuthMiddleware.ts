// import {Req} from "@tsed/common";
// import {Context} from "@tsed/platform-params";
// import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
// import { Forbidden, Unauthorized } from "@tsed/exceptions";
// import { UseAuth } from "@tsed/platform-middlewares";
// import { useDecorators } from "@tsed/core";
// import {CustomAuthMiddleware} from "src/guards/CustomAuthMiddleware";
// import {In, Returns, Security} from "@tsed/schema";

// export interface CustomAuthOptions extends Record<string, unknown> {
//     role?: string;
//     scopes?: string[];
// }

// export function CustomAuth(options: CustomAuthOptions = {}): Function {
//     return useDecorators(
//         UseAuth(CustomAuthMiddleware, options), 
//         Security("oauth", ...(options.scopes || [])), 
//         In("header").Name("Authorization").Type(String).Required(true),
//         Returns(401), 
//         Returns(403)
//         );
// }



// export { CustomAuthMiddleware };
// export { CustomAuthMiddleware };
// @Middleware()
// export class CustomAuthMiddleware implements MiddlewareMethods {
//     public use(@Req() request: Req, @Context() ctx: Context) {
//         // retrieve options given to the @UseAuth decorator
//         const options = ctx.endpoint.get(CustomAuthMiddleware) || {};

//         if (!request.isAuthenticated()) {
//             // passport.js method to check auth
//             throw new Unauthorized("Unauthorized");
//         }

//         if (request.user?.role !== options.role) {
//             throw new Forbidden("Forbidden");
//         }
//     }
// }