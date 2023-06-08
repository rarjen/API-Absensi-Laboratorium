"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Absensis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      karyawan_id: {
        type: Sequelize.INTEGER,
      },
      jam_masuk: {
        type: Sequelize.STRING,
      },
      jam_pulang: {
        type: Sequelize.STRING,
      },
      status_absensi: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      tanggal: {
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
    await queryInterface.dropTable("Absensis");
  },
};
