const { Shift } = require("../models");
const { NotFoundError } = require("../errors");

const create = async (req) => {
  const { shift } = req.body;

  const result = await Shift.create({
    shift,
  });

  return result;
};

const index = async (req) => {
  const result = await Shift.findAll({});

  return result;
};

const show = async (req) => {
  const { shift_id } = req.params;

  const result = await Shift.findOne({ where: { id: shift_id } });
  if (!result) {
    throw new NotFoundError("Shift tidak ada!");
  }

  return result;
};

const edit = async (req) => {
  const { shift_id } = req.params;
  const { shift } = req.body;

  const checkShift = await Shift.findOne({ where: { id: shift_id } });
  if (!checkShift) {
    throw new NotFoundError("Shift tidak ada!");
  }

  const result = await Shift.update({ shift }, { where: { id: shift_id } });

  return result;
};

module.exports = { create, edit, index, show };
