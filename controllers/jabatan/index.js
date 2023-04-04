const {
  createJabatan,
  editJabatan,
  showAllJabatan,
  destroyJabatan,
  getJabatan,
} = require("../../services/jabatan");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
  try {
    const result = await showAllJabatan(req);

    if (result <= 0) {
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "No Data",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success menampilkan semua jabatan",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createJabatan(req);

    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Success menambahkan jabatan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editJabatan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success edit jabatan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await getJabatan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success get jabatan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await destroyJabatan(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success delete jabatan!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update, index, destroy, show };
