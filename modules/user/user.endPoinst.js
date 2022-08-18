const { access } = require("../../middleware/auth");



const endPoints = {
  updateUSer: [access.Admin, access.User],
  deleteUser: [access.Admin],
  getMessage: [ access.Admin]

};

module.exports = endPoints;


// status code 