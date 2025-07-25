const User = require("../models/user");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const loggedinuser = await User.findOne({ email, password });
  if (!loggedinuser) {
    return res.render("login", { error: "invalid credentials" });
  }
  /*const sessionId = uuidv4(); // Create session
  setUser(sessionId, loggedinuser); // Store on serverin map
  res.cookie("uid", sessionId); // Send to browser  this part to create it in memory using map but issue is that it get refereses when the server restarts.*/

  const token = setUser(loggedinuser); // Returns JWT token
    
    // Set JWT token as cookie
    res.cookie("uid", token, {
        httpOnly: true,        // Prevent XSS attacks
        secure: false,         // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT expiration)
        sameSite: 'strict'     // CSRF protection
    });
  return res.redirect("/");
}
module.exports = { handleUserSignup, handleUserLogin };
