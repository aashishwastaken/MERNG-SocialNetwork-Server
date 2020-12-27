const jwt = require('jsonwebtoken');

module.exports.checkAuth = (context) => {
    try {
        //console.log(context);
        const authHeader = context.req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split("Bearer ")[1];
            if (token) {
                try {
                    let user = jwt.verify(token, process.env.SECRET_KEY);
                    return user;
                } catch (err) {
                    throw new Error("Invalid/Expired Token");
                }
            } else {
                throw new Error("Token isn't there");
            }

        } else {
            throw new Error("Authorization header isn't there");
        }
    }
    catch (err) {
        throw new Error(err);
    }
}