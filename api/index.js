import fastify from "fastify";
import { v4 } from "uuid";

const app = fastify({ logger: true });

app.get("/", function (req, reply) {
  const path = `/api/item/${v4()}`;
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .header("Cache-Control", "s-max-age=1, stale-while-revalidate")
    .send(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", function (req, reply) {
  const { slug } = req.params;
  reply.code(200).send(`Item ${slug}`);
});

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
