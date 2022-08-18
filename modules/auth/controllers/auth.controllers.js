const userModel = require("../../../DB/models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signUp = (req, res) => {
   try {
        const { userName, email, password } = req.body;
        const saveUser = new userModel({ userName, email, password });
        const savedUser = saveUser.save();
        res.json({ message: "Added", savedUser });
   } catch (error) {
         res.json({ message: "error", error });
   }
};

const login = async(req, res) => {
      
      const { email, password } = req.body;
      const findUser = await userModel.findOne({ email })
      if (!findUser) {
            res.json({message:"user is not exist"})
      } else {
            bcrypt.compare(password, findUser.password, function (err, result) {
              // result == true
                  if (result) {
                        var token = jwt.sign({ id: findUser._id, role: findUser.role, isLogin: true }, process.env.JWTKEY,{expiresIn:'1h'});

                        res.json({ message: "login success", token });
                  } else {
                        res.json({ message: "your password is not correct" });
                        
                  }
            });
      }
}

module.exports = { signUp, login };