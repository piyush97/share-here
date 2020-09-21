import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/post";
import microConfig from "./micro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const post = orm.em.create(Post, { title: "my first post" });

  await orm.em.persistAndFlush(post);
};
console.log("hello world");

main().catch((err) => {
  console.log(err);
});
