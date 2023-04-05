const { upload } = require("../../services/avatar");
const { StatusCodes } = require("http-status-codes");

const uploadAvatar = async (req, res, next) => {
  try {
    const result = await upload(req);

    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Success upload avatar",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadAvatar };
