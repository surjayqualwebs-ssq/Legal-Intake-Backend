// src/modules/auth/auth.routes.js
import { login } from "./auth.service.js";

export default async function authRoutes(fastify) {
  fastify.post(
    "/login",
    {
      schema: {
        description: "Authenticate user and return JWT",
        tags: ["Auth"],

        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 }
          },
          additionalProperties: false
        },

        response: {
          200: {
            type: "object",
            required: ["token"],
            properties: {
              token: { type: "string" }
            }
          },
          401: {
            type: "object",
            properties: {
              error: {
                type: "object",
                required: ["code", "message"],
                properties: {
                  code: { type: "string" },
                  message: { type: "string" }
                }
              }
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        return await login(request.body, fastify.models, fastify);
      } catch {
        reply.code(401).send({
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid credentials"
          }
        });
      }
    }
  );
}
