
const jwt = require('jsonwebtoken');

// Secret key for signing JWTs (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET;

// Function to create a JWT token containing user data
function setUser(user) {
    // Create JWT payload with user information
    const payload = {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        
    };
    
    // Sign the JWT with secret key and set expiration
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '24h', // Token expires in 24 hours
        issuer: 'URL SHORTNER SERVICE'
    });
    
    return token;
}

// Function to verify and decode JWT token
function getUser(token) {
    // If no token provided, return null
    if (!token) return null;
    
    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Returns the user data from token payload
    } catch (error) {
        // Token is invalid, expired, or malformed
        console.log('JWT verification failed:', error.message);
        return null;
    }
}



module.exports = {
    setUser,
    getUser,
};
