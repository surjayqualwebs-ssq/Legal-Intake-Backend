console.log("🔥 sequelize plugin file loaded");

import bcrypt from "bcrypt";
import fp from "fastify-plugin";
import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/database.cjs";
import { env } from "../config/env.js";

// 🔴 IMPORT MODELS
import UserModel from "../modules/users/user.model.js";
import CaseModel from "../modules/cases/case.model.js";

export default fp(async (fastify) => {
  const config = dbConfig[env.NODE_ENV];

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging
    }
  );

  // 1️⃣ Connect to DB
  await sequelize.authenticate();

  const [result] = await sequelize.query("SELECT current_database()");
  console.log("🧠 Sequelize connected to DB:", result[0].current_database);

  // 2️⃣ Register models
  fastify.decorate("models", {});
  fastify.models.User = UserModel(sequelize, DataTypes);
  fastify.models.Case = CaseModel(sequelize, DataTypes);

  // 3️⃣ Sync AFTER models exist
  if (env.NODE_ENV === "development") {
    await sequelize.sync();
  }

  // =========================
  // 4️⃣ SEED ADMIN USER (DEV)
  // =========================
  if (env.NODE_ENV === "development") {
    const { User } = fastify.models;

    const adminEmail = "admin@legal.com";

    const existingAdmin = await User.findOne({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN"
      });

      console.log("✅ Admin user seeded");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  }

  // 5️⃣ Expose sequelize
  fastify.decorate("sequelize", sequelize);
});
