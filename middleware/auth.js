
const jwt = require("jsonwebtoken");
const userModel = require("../DB/models/user.model")
const  { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } =  require("http-status-codes");
const access = {
    Admin: "Admin",
    User: "user",
    HR:"hr"
}


// http status codes


const auth = (accessRoles) => {
    return (req, res, next) => {
        if (req.headers == null || req.headers == undefined || !req.headers["authorization"] || !req.headers["authorization"].startsWith("Bearer ")) {
            res.json({message :"you have to send a token"})
        } else {
            const token = req.headers["authorization"].split(" ")[1]
            console.log(token);
            jwt.verify(token, process.env.JWTKEY,async function (err, decoded) {
                console.log(decoded); // bar
                console.log(accessRoles);
                if (decoded) {
                    let user = await userModel.findById(decoded.id)
                    if (user) {
                        if (accessRoles.includes(decoded.role)) {
                            req.user = user;
                            next();
                        } else {
                             res.status(StatusCodes.FORBIDDEN).json({ message: "you're not auth to get this data", extraInf : getReasonPhrase(StatusCodes.FORBIDDEN) });
                        }
                        
                        
                    } else {
                         res.status(4222).json({ message: "not exist user" });
                    }
                } else {
                      res.status(422).json({ message: "invalid token" });
                }
            });
        }
    }
}

module.exports = { auth, access };





// messages
// messageBody, reciverID => model ... Joi validation
// http status code

// multer => upload 


// 