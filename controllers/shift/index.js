const { create, edit, index, show } = require("../../services/shift");
const { StatusCodes } = require("http-status-codes");

const createShift = async (req, res, next) => {
  try {
    const result = await create(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success create shift!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const editShift = async (req, res, next) => {
  try {
    const result = await edit(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success edit shift!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const indexShift = async (req, res, next) => {
  try {
    const result = await index(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success get all shift!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const showShift = async (req, res, next) => {
  try {
    const result = await show(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success show shift!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createShift, editShift, indexShift, showShift };
