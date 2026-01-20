import bcrypt from "bcrypt";

export async function createUser(data, { User }) {
  const hashed = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashed });
}

export async function listUsers({ User }) {
  return User.findAll({ attributes: ["id", "email", "role"] });
}
