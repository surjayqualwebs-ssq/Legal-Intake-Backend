import { ROLES } from "../../common/constants.js";

if (![ROLES.ADMIN, ROLES.LAWYER].includes(request.user.role)) {
      reply.code(403).send({
      error: { code: "FORBIDDEN", message: "Cannot view cases" }
    });
}



