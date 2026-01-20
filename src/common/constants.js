/**
 * Application-wide constants
 * Keep ALL enums, roles, permissions, statuses here
 * so contracts remain frozen and consistent.
 */

/* =========================
   USER ROLES
========================= */
export const ROLES = Object.freeze({
  ADMIN: "ADMIN",
  LAWYER: "LAWYER",
  STAFF: "STAFF"
});

/* =========================
   PERMISSIONS (RBAC)
========================= */
export const PERMISSIONS = Object.freeze({
  CREATE_USER: "CREATE_USER",
  VIEW_USER: "VIEW_USER",

  CREATE_CASE: "CREATE_CASE",
  VIEW_CASE: "VIEW_CASE",
  UPDATE_CASE: "UPDATE_CASE",
  DELETE_CASE: "DELETE_CASE"
});

/* =========================
   LEGAL CASE STATUSES
========================= */
export const CASE_STATUS = Object.freeze({
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  CLOSED: "CLOSED"
});

/* =========================
   ERROR CODES (API CONTRACT)
========================= */
export const ERROR_CODES = Object.freeze({
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR"
});

/* =========================
   TOKEN
========================= */
export const TOKEN_TYPE = Object.freeze({
  BEARER: "Bearer"
});
