// import { PlatformExpress } from "@tsed/platform-express";
// import { Server } from "./Server";
// import { JwtProtocol } from "src/protocols/LoginLocalProtocol";
// import { User } from "./models/User";
// import { ProtocolOptions } from "@tsed/passport";
// import { PassportMiddleware } from "src/middlewares/PassportMiddleware";

// async function bootstrap() {
//   try {
//     const jwtProtocolOptions: Partial<ProtocolOptions<any>> = {
//       name: "jwt",
//     };

//     const platform = await PlatformExpress.bootstrap(Server, {
//       mount: {
//         "/rest": [`${__dirname}/controllers/**/*.ts`],
//       },
//       componentsScan: [`${__dirname}/services/**/*.ts`],
//       httpPort: 8083,
//       // Configure Passport with JWT protocol and user model
//       passport: {
//         userInfoModel: User,
//         jwt: jwtProtocolOptions,
//       },
//     });

//     // Access the underlying Express application
//     const expressApp = platform.rawApp;
//     expressApp.use(PassportMiddleware);

//     await platform.listen();

//     process.on("SIGINT", async () => {
//       await platform.stop();
//     });
//   } catch (error) {
//     console.error("Error during server bootstrap:", error);
//   }
// }

// bootstrap();
import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";


// import { User } from "./models/User";


async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();
    $log.debug("Server initialized");

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({ event: "SERVER_BOOTSTRAP_ERROR", error });
  }
}

bootstrap();
