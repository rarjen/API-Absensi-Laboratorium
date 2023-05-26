const imagekit = require("./imagekit");

const uploadAvatar = async (file) => {
  try {
    const uploadFile = await imagekit.upload({
      file,
      fileName: `avatar`,
    });

    const data = {
      title: uploadFile.name,
      url: uploadFile.url,
    };

    return data;
  } catch (error) {
    throw new error();
  }
};

module.exports = uploadAvatar;
