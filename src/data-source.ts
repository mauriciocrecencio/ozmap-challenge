import { DataSource } from "typeorm";
import { env } from "./env/index";
import "reflect-metadata"


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})