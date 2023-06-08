"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Karyawans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jabatan_id: {
        type: Sequelize.INTEGER,
      },
      shift_id: {
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      nomer_karyawan: {
        type: Sequelize.STRING,
      },
      nomer_telepon: {
        type: Sequelize.STRING,
      },
      nomer_rekening: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Karyawans");
  },
};
