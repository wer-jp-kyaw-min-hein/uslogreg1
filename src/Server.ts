// import {join} from "path";
// import {Configuration, Inject} from "@tsed/di";
// import {PlatformApplication} from "@tsed/common";
// import "@tsed/platform-express"; // /!\ keep this import
// import "@tsed/passport";
// import "@tsed/ajv";
// import {config} from "./config/index";
// import * as rest from "./controllers/rest/index";
// import { diskStorage } from "multer";
// import bodyParser  from "body-parser";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import methodOverride from "method-override";
// import { JwtProtocol } from "src/protocols/LoginLocalProtocol";
// import { ProtocolOptions } from "@tsed/passport";


// import your protocol. Ts.ED will discover it automatically
//import { LoginLocalProtocol } from "./protocols/LoginLocalProtocol";
// import { User } from "./models/User";

// function generateName(length: number) {
//   let str = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     str += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return str;
// }

// const jwtProtocolOptions: Partial<ProtocolOptions<JwtProtocol>> = {
//   name: "jwt",
//   // other JwtProtocol options...
// };

// @Configuration({
//   ...config,
//   acceptMimes: ["application/json"],
//   httpPort: process.env.PORT || 8083,
//   httpsPort: false, // CHANGE
//   disableComponentsScan: true,
//   passport: {
//     userInfoModel: User,
//     userProperty: "user",
    // protocols: {
    //   jwt: jwtProtocolOptions,
    // }
    /**
     * Set a custom user info model. By default Ts.ED use UserInfo. Set false to disable Ts.ED json-mapper.
     */
    // userInfoModel: CustomUserInfoModel
    // userProperty: string,
    // pauseStream: string,
    // disableSession: boolean
//   },
//   mount: {
//     "/rest": [
//       ...Object.values(rest)
//     ]
//   },
//   middlewares: [
//     "cors",
//     "cookie-parser",
//     "compression",
//     "method-override",
//     "json-parser",
//     { use: "urlencoded-parser", options: { extended: true }}
//   ],
//   views: {
//     root: join(process.cwd(), "../views"),
//     extensions: {
//       ejs: "ejs"
//     }
//   },
//   exclude: [
//     "**/*.spec.ts"
//   ],
//   multer: {
//     storage: diskStorage({
//       destination: join(process.cwd(), "./public/uploads"),
//       filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `${generateName(15)}-${Date.now()}.${ext}`);
//       }
//     })
//   },
// statics: {
//   "/static": [
//     {
//       root: "./public",
//       hook: "$beforeRoutesInit" // or any other hook you prefer
//       // additional statics options if needed
//     }
//   ]
// }
// })
// export class Server {
//   @Inject()
//    app: PlatformApplication;

//   @Inject()
//   protected settings: Configuration;

//   $beforeRoutesInit() {
//     this.app
//     .use(cookieParser())
//     .use(methodOverride())
//     .use(bodyParser.json())
//     .use(
//       bodyParser.urlencoded({
//         extended: true
//       })
//     )
//     // @ts-ignore
//     .use(
//       session({
//         secret: "mysecretkey",
//         resave: true,
//         saveUninitialized: true,
//         // maxAge: 36000,
//         cookie: {
//           path: "/",
//           httpOnly: true,
//           secure: false
//         }
//       })
//     );
//   }
// }

import {Configuration, Inject} from "@tsed/di";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/passport";
import {config} from "./config";
import * as rest from "./controllers/rest/index";
import { User } from "./models/User";
import { PlatformApplication } from "@tsed/common";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import { join } from "path";
import { diskStorage } from "multer";
import session from "express-session";
import { AuthController } from "src/controllers/rest/AuthController"; // Import the AuthController
// import "./protocols";

function generateName(length: number) {
    let str = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      str += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return str;
  }

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  passport: {
        userInfoModel: User,
        userProperty: "user",
  },
  mount: {
    "/rest": [...Object.values(rest), AuthController],
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    {use: "urlencoded-parser", options: {extended: true}},
  ],
      views: {
            root: join(process.cwd(), "../views"),
            extensions: {
              ejs: "ejs"
            }
          },
          exclude: [
            "**/*.spec.ts"
          ],
          multer: {
            limits: { fileSize: 1048576},
            storage: diskStorage({
              destination: join(process.cwd(), "./public/uploads"),
              filename: (req, file, cb) => {
                const ext = file.mimetype.split('/')[1];
                cb(null, `${generateName(15)}-${Date.now()}.${ext}`);
              }
            })
          },
        statics: {
          "/static": [
            {
              root: "./public",
              hook: "$beforeRoutesInit" // or any other hook you prefer
              // additional statics options if needed
            }
          ]
        }
        })
export class Server {
    @Inject()
     app: PlatformApplication;
  
    @Inject()
    protected settings: Configuration;
  
    $beforeRoutesInit() {
      this.app
      .use(cookieParser())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
    )
      // @ts-ignore
      .use(
        session({
          secret: "mysecretkey",
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false
          }
        })
      );
    }
  }

