const { Admin, Role } = require("../models");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const v = new Validator();
const { JWT_SECRET_KEY } = process.env;

const register = async (req) => {
  const { email, password, confirmPassword, role_id } = req.body;
  const schema = {
    email: { type: "email", label: "Email Address" },
    password: { type: "string", min: 6 },
  };
  const check = await v.compile(schema);

  const validate = check({
    email: `${email}`,
    password: `${password}`,
  });

  if (validate.length > 0) {
    throw new BadRequestError(
      "Email tidak valid / Password minimal 6 karakter"
    );
  }

  if (password !== confirmPassword) {
    throw new BadRequestError(`Password doesn't match`);
  }

  const userExist = await Admin.findOne({ where: { email } });

  if (userExist) {
    throw new BadRequestError("User sudah terdaftar");
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const result = await Admin.create({
    email,
    password: passwordHashed,
    role_id,
  });

  return result;
};

const login = async (req) => {
  const { email, password } = req.body;

  const schema = {
    email: { type: "email", label: "Email Address" },
  };
  const check = await v.compile(schema);

  const validate = check({ email: `${email}` });

  if (validate.length > 0) {
    throw new BadRequestError("Email tidak valid");
  }

  const user = await Admin.findOne({
    where: { email },
    include: [{ model: Role, as: "role" }],
  });

  if (!user) {
    throw new BadRequestError("Email atau password salah");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new BadRequestError("Email atau password salah");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role.role,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return { email, token };
};

module.exports = { register, login };
