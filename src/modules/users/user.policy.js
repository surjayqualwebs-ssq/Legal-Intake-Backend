import { ROLES, PERMISSIONS, ERROR_CODES } from "../../common/constants.js";

/**
 * Role → Permission mapping
 */
const RBAC = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.CREATE_CASE,
    PERMISSIONS.VIEW_CASE,
    PERMISSIONS.UPDATE_CASE,
    PERMISSIONS.DELETE_CASE
  ],

  [ROLES.LAWYER]: [
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.VIEW_CASE,
    // PERMISSIONS.UPDATE_CASE
  ],

  [ROLES.STAFF]: [
    PERMISSIONS.VIEW_CASE
  ]
};

/**
 * Permission guard (RBAC)
 */
export function requirePermission(permission) {
  return function (request, reply, done) {
    const role = request.user?.role;

    if (!role) {
      return reply.code(401).send({
        error: {
          code: ERROR_CODES.UNAUTHORIZED,
          message: "Authentication required"
        }
      });
    }

    const allowedPermissions = RBAC[role] || [];

    if (!allowedPermissions.includes(permission)) {
      return reply.code(403).send({
        error: {
          code: ERROR_CODES.FORBIDDEN,
          message: "Insufficient permissions"
        }
      });
    }

    done();
  };
}
