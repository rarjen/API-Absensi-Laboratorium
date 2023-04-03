const { Karyawan, Jabatan } = require("../models");
const Validator = require("fastest-validator");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { Op } = require("sequelize");
const v = new Validator();

const createKaryawan = async (req) => {
  const {
    id_jabatan,
    full_name,
    email,
    shift,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
    avatar,
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
        { email: { [Op.like]: email } },
        { nomer_karyawan: { [Op.like]: nomer_karyawan } },
        { nomer_telepon: { [Op.like]: nomer_telepon } },
        { nomer_rekening: { [Op.like]: nomer_rekening } },
      ],
    },
  });

  if (userExist) throw new BadRequestError("Duplikasi Data!");

  const result = await Karyawan.create({
    id_jabatan,
    full_name,
    email,
    shift,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
    avatar,
  });

  return result;
};

const editKaryawan = async (req) => {
  const { id_karyawan } = req.params;
  const {
    id_jabatan,
    full_name,
    email,
    shift,
    nomer_karyawan,
    nomer_telepon,
    nomer_rekening,
    avatar,
  } = req.body;

  const schema = {
    email: { type: "email", label: "Email Address" },
  };
  const check = await v.compile(schema);

  const validate = check({
    email: `${email}`,
  });

  if (validate.length > 0) throw new BadRequestError("Email tidak valid");

  const karyawanExist = await Karyawan.findOne({ where: { id: id_karyawan } });

  if (!karyawanExist) {
    throw new BadRequestError(`Tidak ada karyawan dengan id: ${id_karyawan}`);
  }

  const checkDuplicate = await Karyawan.findOne({
    where: {
      [Op.or]: [
        { email: { [Op.like]: email } },
        { nomer_karyawan: { [Op.like]: nomer_karyawan } },
        { nomer_telepon: { [Op.like]: nomer_telepon } },
        { nomer_rekening: { [Op.like]: nomer_rekening } },
      ],
    },
  });

  if (checkDuplicate) throw new BadRequestError("Duplikasi Data!");

  const result = await Karyawan.update(
    {
      id_jabatan,
      full_name,
      email,
      shift,
      nomer_karyawan,
      nomer_telepon,
      nomer_rekening,
      avatar,
    },
    { where: { id: id_karyawan } }
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
    ],
  });

  return result;
};

module.exports = { createKaryawan, editKaryawan, showAllKaryawan };
