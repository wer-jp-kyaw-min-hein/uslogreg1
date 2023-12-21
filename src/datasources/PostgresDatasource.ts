import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import { User } from "../models/User";

export const POSTGRES_DATASOURCE = Symbol.for("PostgresDatasource");
export const PostgresDatasource = new DataSource({
  type: "postgres",
  entities: [User],
  host: "localhost",
  port: 5432,
  username: "lizard",
  password: "",
  database: "crud_project",
  synchronize: true,
});

registerProvider<DataSource>({
  provide: POSTGRES_DATASOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await PostgresDatasource.initialize();

    logger.info("Connected with typeorm to database: Postgres");

    return PostgresDatasource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
