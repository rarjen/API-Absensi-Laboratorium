"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Jabatans",
      [
        {
          jabatan: "Kepala Laboratorium",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Koordinator Server & Jaringan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Koordinator Software & Hardware",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Sekretaris",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Admin Lab",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Laboran Kontrak",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan: "Laboran Magang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Jabatans", null, {});
  },
};
