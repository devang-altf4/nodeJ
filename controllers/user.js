const User = require("../models/user");
const {v4: uuidv4}= require("uuid")

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const loggedinuser = await User.findOne({ email, password });
  if (!loggedinuser) {
    return res.render("login", { error: "invalid credentials" });
  }
  return res.render("home", { user: loggedinuser });
}
module.exports = { handleUserSignup, handleUserLogin };
