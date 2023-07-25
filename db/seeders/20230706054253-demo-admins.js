"use strict";
const bcrypt = require("bcrypt");

const { PASSWORD_DEFAULT } = process.env;

module.exports = {
  async up(queryInterface, Sequelize) {
    const encrypted = await bcrypt.hash(PASSWORD_DEFAULT, 10);
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          role_id: 1,
          email: "otnielkevin.ok@gmail.com",
          password: encrypted,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
