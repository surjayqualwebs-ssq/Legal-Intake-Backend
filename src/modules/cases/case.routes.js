// case.routes.js
import { listCases, getCaseById } from "./case.service.js";

export default async function (fastify) {
  fastify.get("/", async () => listCases());
  fastify.get("/:id", async (req) => getCaseById(req.params.id));
  
  fastify.get(
    "/cases",
    { preHandler: [fastify.authenticate, allow("VIEW_CASE")] },
    handler
  );
}



