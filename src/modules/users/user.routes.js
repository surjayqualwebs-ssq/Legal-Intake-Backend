import bcrypt from "bcrypt";
import { requirePermission } from "./user.policy.js";
import { PERMISSIONS } from "../../common/constants.js";
import { ROLES } from "../../common/constants.js";

export default async function userRoutes(fastify) {

  // PUBLIC SIGNUP → defaults to STAFF
  fastify.post("/", async (request, reply) => {
    const { email, password } = request.body;
    const { User } = fastify.models;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return reply.code(409).send({
        error: {
          code: "USER_EXISTS",
          message: "User already exists"
        }
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
      role: ROLES.STAFF
    });

    reply.code(201).send({
      id: user.id,
      email: user.email,
      role: user.role
    });
  });

  // ADMIN / LAWYER can view users
  fastify.get(
    "/",
    {
      preHandler: [
        fastify.authenticate,
        requirePermission(PERMISSIONS.VIEW_USER)
      ]
    },
    async () => {
      return fastify.models.User.findAll({
        attributes: ["id", "email", "role"]
      });
    }
  );
}
