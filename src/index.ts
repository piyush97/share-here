import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const port = 4000;
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HelloResolver], validate: false }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
