import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
  const port = 4000;
  const orm = await MikroORM.init(microConfig);
  orm.getMigrator().up();

  const app = express();
  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
