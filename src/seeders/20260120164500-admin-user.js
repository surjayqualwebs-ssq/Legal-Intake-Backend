"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@legal.com",
        password: hash,
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      email: "admin@legal.com"
    });
  }
};
