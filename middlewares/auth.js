// Import the getUser function from the auth service module
/*const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
}
*/
const { getUser } = require("../service/auth");


async function restrictToLoggedInUserOnly(req, res, next) {
    // Extract JWT token from cookies
    const token = req.cookies.uid;
    console.log("Cookie found:", !!token);
    
    // If no token exists, redirect to login
    if (!token) return res.redirect("/login");
    
    // Verify and decode JWT token
    const user = getUser(token);
    
    // If token is invalid or expired, redirect to login
    if (!user) {
        // Clear invalid token cookie
        res.clearCookie('uid');
        return res.redirect("/login");
    }
    
    // Attach decoded user data to request
    req.user = user;
    
    // Continue to next middleware/route
    next();
}

module.exports = { restrictToLoggedInUserOnly };

