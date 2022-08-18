const {auth} = require("../../middleware/auth");
const validationFun = require("../../middleware/validationFun");
const {getAllPosts, updateUser, getMessages,addComment, updateProfilePic, updateCoverPics, uploadCV, addPost } = require("./controllers/user.controllers");
const endPoints = require("./user.endPoinst");
const {multerFun, validationFileType} = require('../../service/multer')
const { updateUserValidation } = require("./user.validation");

const router = require("express").Router();


router.patch("/user", auth(endPoints.updateUSer), validationFun(updateUserValidation), updateUser);

router.get("/user/messages", auth(endPoints.getMessage), getMessages);

router.patch("/user/profilePic", auth(endPoints.updateUSer), multerFun("user/profilePic", validationFileType.image).single("image"), updateProfilePic);
router.patch("/user/profileCoverPics", auth(endPoints.updateUSer), multerFun("user/coverPic", validationFileType.image).array("images", 5), updateCoverPics);
router.patch("/user/cv", auth(endPoints.updateUSer), multerFun("user/cv", validationFileType.fileText).single("image"), uploadCV);

router.post("/post", auth(endPoints.updateUSer), addPost);
router.post("/post/:id/comment",auth(endPoints.updateUSer), addComment);
router.get("/posts", getAllPosts);





module.exports = router;
