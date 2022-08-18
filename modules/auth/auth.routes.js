const validationFun = require("../../middleware/validationFun");
const { signUp, login } = require("./controllers/auth.controllers");
const { signUpValidation, logInValidation } = require("./user.validation");

const router = require("express").Router()


router.post("/signUp", validationFun(signUpValidation), signUp);
router.post("/login", validationFun(logInValidation), login);


module.exports = router;