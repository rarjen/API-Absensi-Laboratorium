const { Jabatan } = require("../models");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createJabatan = async (req) => {
  const { jabatan } = req.body;

  const jabatanExist = await Jabatan.findOne({ where: { jabatan } });

  if (jabatanExist) {
    throw new BadRequestError("Jabatan sudah terdaftar!");
  }

  const result = await Jabatan.create({ jabatan });

  return result;
};

const editJabatan = async (req) => {
  const { id_jabatan } = req.params;
  const { jabatan } = req.body;

  const jabatanExist = await Jabatan.findOne({ where: { id: id_jabatan } });

  if (!jabatanExist) {
    throw new BadRequestError(`Tidak ada jabatan dengan id: ${id_jabatan}`);
  }

  const result = await Jabatan.update(
    { jabatan },
    { where: { id: id_jabatan } }
  );

  if (!result) throw new BadRequestError("Tidak jabatan dengan");

  return result;
};

const showAllJabatan = async (req) => {
  const result = await Jabatan.findAll({});

  return result;
};

const getJabatan = async (req) => {
  const { id_jabatan } = req.params;

  const result = await Jabatan.findOne({ where: { id: id_jabatan } });
  if (!result) {
    throw new BadRequestError(`Tidak ada jabatan dengan id: ${id_jabatan}`);
  }

  return result;
};

const destroyJabatan = async (req) => {
  const { id_jabatan } = req.params;

  const jabatanExist = await Jabatan.findOne({ where: { id: id_jabatan } });

  if (!jabatanExist) {
    throw new BadRequestError(`Tidak ada jabatan dengan id: ${id_jabatan}`);
  }

  const result = await Jabatan.destroy({ where: { id: id_jabatan } });

  return result;
};

module.exports = {
  createJabatan,
  editJabatan,
  showAllJabatan,
  destroyJabatan,
  getJabatan,
};
