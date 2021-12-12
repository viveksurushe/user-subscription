const UserSchema = require("./user.model");

async function getAll() {
  return UserSchema.find();
}

async function getById(userId) {
  return UserSchema.findById(userId);
}

async function getByUsername(userName) {
  return UserSchema.find({"userName": { $regex: new RegExp("^" + userName.toLowerCase(), "ig") } });
}

async function create(user) {
  const userSchema = new UserSchema(user);
  return userSchema.save();
}

async function update(id, user) {
  return UserSchema.findByIdAndUpdate(id, user, {new: true});
}

async function remove(userId) {
  return UserSchema.findByIdAndRemove(userId);
}

module.exports = {
  getAll: getAll,
  getByUsername:getByUsername,
  create: create,
  update: update,
  getById: getById,
  remove:remove
};
