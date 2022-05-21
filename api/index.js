const fastify = require("fastify");
const { v4 } = require("uuid");

const server = fastify({ logger: true });

server.get("/", function (req, reply) {
  const path = `/api/item/${v4()}`;
  reply
    .code(200)
    .header("Content-Type", "text/html")
    .header("Cache-Control", "s-max-age=1, stale-while-revalidate")
    .send(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

server.get("/api/item/:slug", function (req, reply) {
  const { slug } = req.params;
  reply.code(200).send(`Item ${slug}`);
});

module.exports = server;
