import { requirePermission } from "../users/user.policy.js";
import { PERMISSIONS } from "../../common/constants.js";
import { requireCaseOwnershipOrAdmin } from "./case.policy.js";

export default async function caseRoutes(fastify) {
  const { Case } = fastify.models;

  /**
   * =========================
   * CREATE CASE
   * ADMIN only
   * =========================
   */
  fastify.post(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        requirePermission(PERMISSIONS.CREATE_CASE)
      ],
      schema: {
        description: "Create a new legal case",
        tags: ["Cases"],
        body: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
            description: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async (request, reply) => {
      const { title, description } = request.body;

      const legalCase = await Case.create({
        title,
        description,
        status: "OPEN",
        createdBy: request.user.id
      });

      reply.code(201).send(legalCase);
    }
  );

  /**
   * =========================
   * VIEW CASES
   * ADMIN / LAWYER / STAFF
   * =========================
   */
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        requirePermission(PERMISSIONS.VIEW_CASE),
        // requireCaseOwnershipOrAdmin()
      ],
      schema: {
        description: "List legal cases",
        tags: ["Cases"]
      }
    },
    async () => {
      return Case.findAll();
    }
  );

  /**
   * =========================
   * UPDATE CASE
   * ADMIN / LAWYER
   * =========================
   */
  fastify.put(
    "/:id",
    {
      preHandler: [
        fastify.authenticate,
        requirePermission(PERMISSIONS.UPDATE_CASE),
        // requireCaseOwnershipOrAdmin()
      ],
      schema: {
        description: "Update a legal case",
        tags: ["Cases"],
        params: {
          type: "object",
          properties: {
            id: { type: "number" }
          }
        },
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            status: { type: "string" }
          },
          additionalProperties: false
        }
      }
    },
    async (request) => {
      const { id } = request.params;

      const legalCase = await Case.findByPk(id);
      if (!legalCase) {
        return reply.code(404).send({
          error: {
            code: "NOT_FOUND",
            message: "Case not found"
          }
        });
      }

      await legalCase.update(request.body);
      return legalCase;
    }
  );

  /**
   * =========================
   * DELETE CASE
   * ADMIN only
   * =========================
   */
  fastify.delete(
    "/:id",
    {
      preHandler: [
        fastify.authenticate,
        requirePermission(PERMISSIONS.DELETE_CASE),
        // requireCaseOwnershipOrAdmin()
      ],
      schema: {
        description: "Delete a legal case",
        tags: ["Cases"],
        params: {
          type: "object",
          properties: {
            id: { type: "number" }
          }
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;

      const legalCase = await Case.findByPk(id);
      if (!legalCase) {
        return reply.code(404).send({
          error: {
            code: "NOT_FOUND",
            message: "Case not found"
          }
        });
      }

      await legalCase.destroy();
      reply.code(204).send();
    }
  );
}
