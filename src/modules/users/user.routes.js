// src/modules/users/user.routes.js
export default async function userRoutes(fastify) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
      schema: {
        description: "List all users (ADMIN only)",
        tags: ["Users"],

        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
                role: { type: "string" }
              }
            }
          },
          401: {
            type: "object",
            properties: {
              error: {
                type: "object",
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
    async (request) => {
      return fastify.models.User.findAll({
        attributes: ["id", "email", "role"]
      });
    }
  );
}
