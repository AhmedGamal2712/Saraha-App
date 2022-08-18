const validationFun = require("../../middleware/validationFun");
const { addMessage } = require("./controllers/message.controllers");
const { addMessageValidator } = require("./message.validation");

const router = require("express").Router();


router.post("/message/:id", validationFun(addMessageValidator), addMessage);
module.exports = router;
