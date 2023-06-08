const { Karyawan, Jabatan, Shift } = require("../models");
const Validator = require("fastest-validator");
const { BadRequestError } = require("../errors");
const { Op } = require("sequelize");
const v = new Validator();

const createKaryawan = async (req) => {
  const {
    jabatan_id,
    shift_id,
    full_name,
    email,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
  } = req.body;

  const schema = {
    email: { type: "email", label: "Email Address" },
  };
  const check = await v.compile(schema);

  const validate = check({
    email: `${email}`,
  });

  if (validate.length > 0) throw new BadRequestError("Email tidak valid");

  const userExist = await Karyawan.findOne({
    where: {
      [Op.or]: [
        { email },
        { nomer_karyawan },
        { nomer_telepon },
        { nomer_rekening },
      ],
    },
  });

  if (userExist) throw new BadRequestError("Duplikasi Data!");

  const result = await Karyawan.create({
    jabatan_id,
    shift_id,
    full_name,
    email,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
  });

  return result;
};

const editKaryawan = async (req) => {
  const { karyawan_id } = req.params;
  const {
    jabatan_id,
    shift_id,
    full_name,
    email,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
  } = req.body;

  const schema = {
    email: { type: "email", label: "Email Address" },
  };
  const check = await v.compile(schema);

  const validate = check({
    email: `${email}`,
  });

  if (validate.length > 0) throw new BadRequestError("Email tidak valid");

  const karyawanExist = await Karyawan.findOne({ where: { id: karyawan_id } });

  if (!karyawanExist) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${karyawan_id}`);
  }

  const checkDuplicate = await Karyawan.findOne({
    where: {
      id: { [Op.ne]: karyawan_id },
      [Op.or]: [
        { email },
        { nomer_karyawan },
        { nomer_telepon },
        { nomer_rekening },
      ],
    },
  });

  if (checkDuplicate) throw new BadRequestError("Duplikasi Data!");

  const result = await Karyawan.update(
    {
      jabatan_id,
      shift_id,
      full_name,
      email,
      nomer_karyawan,
      nomer_telepon,
      nomer_rekening,
    },
    { where: { id: karyawan_id } }
  );

  return result;
};

const showAllKaryawan = async () => {
  const result = await Karyawan.findAll({
    include: [
      {
        model: Jabatan,
        as: "jabatan",
      },
      {
        model: Shift,
        as: "shift",
      },
    ],
  });

  return result;
};

const getKaryawan = async (req) => {
  const { karyawan_id } = req.params;
  const result = await Karyawan.findOne({
    where: { id: karyawan_id },
    include: [
      {
        model: Jabatan,
        as: "jabatan",
      },
      {
        model: Shift,
        as: "shift",
      },
    ],
  });

  if (!result) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${karyawan_id}`);
  }

  return result;
};

const destroyKaryawan = async (req) => {
  const { karyawan_id } = req.params;

  const karyawanExist = await Karyawan.findOne({ where: { id: karyawan_id } });

  if (!karyawanExist) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${karyawan_id}`);
  }

  const result = await Karyawan.destroy({ where: { id: karyawan_id } });

  return result;
};

module.exports = {
  createKaryawan,
  editKaryawan,
  showAllKaryawan,
  getKaryawan,
  destroyKaryawan,
};
