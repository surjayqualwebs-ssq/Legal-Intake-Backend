import { ROLES, ERROR_CODES } from "../../common/constants.js";

export function requireCaseOwnershipOrAdmin() {
  return async function (request, reply) {
    const { Case } = request.server.models;
    const caseId = request.params.id;
    const user = request.user;

    if (!user) {
      return reply.code(401).send({
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: "Authentication required"
        }
      });
    }

    // ADMIN can do anything
    if (user.role === ROLES.ADMIN) {
      return;
    }

    const legalCase = await Case.findByPk(caseId);

    if (!legalCase) {
      return reply.code(404).send({
        error: {
          code: ERROR_CODES.NOT_FOUND,
          message: "Case not found"
        }
      });
    }

    // LAWYER can only act on their own cases
    if (legalCase.createdBy !== user.id) {
      return reply.code(403).send({
        error: {
          code: ERROR_CODES.FORBIDDEN,
          message: "You do not own this case"
        }
      });
    }
  };
}
