import bcrypt from "bcrypt";

export async function login(credentials, models, fastify) {
  const { email, password } = credentials;
  const { User } = models;

  // 1️⃣ Find user
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 3️⃣ Generate JWT
  const token = fastify.jwt.sign({
    id: user.id,
    role: user.role
  });

  return { token };
}
