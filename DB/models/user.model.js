const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { func } = require('joi');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    },
    phone: Number,
  profilePic: String,
    coverPics:Array,
    role: {
        type: String,
        default: 'User'
    },
    lastSeen: String,
    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}
);
userSchema.pre("save", async function (next) {
 this.password =  await bcrypt.hashSync(this.password, parseInt(process.env.SALT_Rounds));
    next()

});

const updateHooks = ["findByIdAndUpdate", "findOneAndDelete", "findOneAndReplace"];
updateHooks.forEach((key) => {
userSchema.pre(key, async function () {
  let data = await this.model.findOne(this.getQuery());
  console.log(data);
  this.set({ __v: data.__v + 1 });
});
})




const userModel = mongoose.model("user", userSchema);


module.exports = userModel;
