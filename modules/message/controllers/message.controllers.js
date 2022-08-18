const messageModel = require("../../../DB/models/messages.model");
const userModel = require("../../../DB/models/user.model")

const addMessage = async (req, res) => {
    
    try {
        const { id } = req.params;
        const { messageBody } = req.body;

        const user = await userModel.findById(id);
        if (user) {
          // post l message
          const message = await messageModel.insertMany({ messageBody, receiverID: id });
          res.json({ messages: "Addaed", message });
        } else {
          res.json({ message: "user is not found" });
        }
    } catch (error) {
         res.json({ message: "catch error", error });
    }
}



module.exports = { addMessage };