import { MikroORM } from "@mikro-orm/core";
import "reflect-metadata";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const port = 4000;
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
