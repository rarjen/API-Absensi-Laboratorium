"use strict";

function generateRandomNumber(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Karyawans",
      [
        {
          jabatan_id: 1,
          shift_id: 1,
          full_name: "Dr. Budi Harjo, M.Kom",
          email: "budi.harjo@dsn.dinus.ac.id",
          nomer_karyawan: "0686.11.1996.106",
          nomer_telepon: "08112962905",
          nomer_rekening: generateRandomNumber(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan_id: 2,
          shift_id: 1,
          full_name: "Wildanil Ghozi, M.Kom",
          email: "wildanil.ghozi@dsn.dinus.ac.id",
          nomer_karyawan: "0686.11.2016.659",
          nomer_telepon: "083863111105",
          nomer_rekening: generateRandomNumber(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan_id: 2,
          shift_id: 2,
          full_name: "Ferry Wahyu Irzadiawan, S.Kom",
          email: "ferrywahyuirzadiawan@adm.dinus.ac.id",
          nomer_karyawan: "0686.21.2022.928",
          nomer_telepon: "085727413289",
          nomer_rekening: generateRandomNumber(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan_id: 3,
          shift_id: 1,
          full_name: "Abdussalam, M.Kom",
          email: "grey.salam@dsn.dinus.ac.id",
          nomer_karyawan: "0686.11.2002.306",
          nomer_telepon: "081901175759",
          nomer_rekening: generateRandomNumber(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jabatan_id: 4,
          shift_id: 1,
          full_name: "Oki Setiono, M.Kom",
          email: "okisetiono@dsn.dinus.ac.id",
          nomer_karyawan: "0686.11.2014.600",
          nomer_telepon: "089509606656",
          nomer_rekening: generateRandomNumber(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Karyawans", null, {});
  },
};
