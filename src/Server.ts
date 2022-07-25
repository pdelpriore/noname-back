import "reflect-metadata";
import dbConnect from "./db/config/dbConnect";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { IContext } from "./graphql/context/Context";
import handleErrors from "./graphql/middleware/error/handleErrors";
import { getErrorMessage } from "./graphql/errors/method/getErrorMessage";
import userAuth from "./graphql/middleware/auth/UserAuth";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const runServer = async () => {
  const port = process.env.SERVER_PORT;

  const corsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN_URL,
  };

  try {
    const dbStatus = await dbConnect.initialize();

    if (dbStatus) console.log("Connected to database");

    const schema = await buildSchema({
      resolvers: [path.join(__dirname, "graphql", "resolvers", "**", "*.ts")],
      globalMiddlewares: [handleErrors, userAuth],
    });

    const apolloServer = new ApolloServer({
      schema,
      context: (context: IContext) => context,
      formatError: ({ message }) => ({ message: getErrorMessage(message) }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(port, () => console.log("Server is running"));
  } catch (err) {
    if (err) console.log(err);
  }
};

runServer();
