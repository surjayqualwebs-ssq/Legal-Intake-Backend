import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { env } from "../config/env.js";

export default fp(async (fastify) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  // Register JWT with HS256 (default)
  fastify.register(jwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: env.JWT_EXPIRES_IN
    }
  });

  // Authentication hook
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(401).send({
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid or missing token"
        }
      });
    }
  });
});
