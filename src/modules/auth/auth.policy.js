export async function authenticate(request, reply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid or expired token"
      }
    });
  }
}
