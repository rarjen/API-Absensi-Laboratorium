'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersentaseAbsensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersentaseAbsensi.init({
    id_karyawan: DataTypes.INTEGER,
    persentase: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'PersentaseAbsensi',
  });
  return PersentaseAbsensi;
};