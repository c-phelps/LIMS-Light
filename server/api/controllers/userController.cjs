//crud logic for users
const { User } = require("../../db/index.cjs");
// serializer/mapper
// const { sampleDetails, sampleList } = require("../mappers/sample.mapper.cjs");

// create user
async function createUser(req, res, next) {
  try {
    const userData = await User.create(req.body, { user: req.user?.username || "system" });
    res.status(201).json(userData);
  } catch (err) {
    next(err);
  }
}

//retrieve all users
async function getAllUsers(req, res, next) {
  try {
    const user = await User.findAll({
      order: [["userName", "ASC"]],
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

//retrieve specific user
async function getUserById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
}

//update user by id
async function updateUser(req, res, next) {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) return res.status(404).json({ error: "User not found" });

    await userData.update(req.body, { user: req.user?.username || "system" });

    res.json(userData);
  } catch (err) {
    next(err);
  }
}

//delete user by id
async function deleteUser(req, res, next) {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) return res.status(404).json({ error: "User not found" });

    await userData.destroy({ user: req.user?.username || "system" });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
