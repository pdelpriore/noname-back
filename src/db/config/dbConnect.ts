import { DataSource } from "typeorm";
import path from "path";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(`${process.env.DB_PORT}`, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, "../", "entity", "**", "*.ts")],
  migrations: [],
  subscribers: [],
});
