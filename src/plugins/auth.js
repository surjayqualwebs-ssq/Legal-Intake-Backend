// plugins/auth.js
export default async function (fastify) {
  fastify.decorate("authenticate", async (req, reply) => {
    await req.jwtVerify();
  });
}
