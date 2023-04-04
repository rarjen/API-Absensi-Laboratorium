"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Absensi.belongsTo(models.Karyawan, {
        foreignKey: "id_karyawan",
        as: "karyawan",
      });
    }
  }
  Absensi.init(
    {
      id_karyawan: DataTypes.INTEGER,
      jam_masuk: DataTypes.STRING,
      jam_pulang: DataTypes.STRING,
      tipe: DataTypes.STRING,
      status: DataTypes.STRING,
      image_url: DataTypes.STRING,
      tanggal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Absensi",
    }
  );
  return Absensi;
};
