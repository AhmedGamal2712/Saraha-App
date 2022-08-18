const userModel = require("../../../DB/models/user.model");

const messageModel = require("../../../DB/models/messages.model")
const postModel = require("../../../DB/models/post.model")
const commentModel= require("../../../DB/models/comment.model")
const updateUser =async (req, res) => {
    
    const { userName } = req.body
    const id = req.user._id;
    const updatedUser = await userModel.findByIdAndUpdate(id, { userName }, { new: true })
    res.json({ message: "updated", updatedUser });

}


const getMessages = async (req, res) => {
    
    let { _id } = req.user;
    const messages = await messageModel.find({ receiverID: _id }).select("messageBody");
    res.json({message:"Done", messages})
}


const updateProfilePic =async (req, res) => {
  console.log(req.destinationFile);
  if (req.fileUploadError) {
    res.status(422).json({message:"in-valid file"})
  } else {
     let fileName = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`;

    const updateUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { profilePic: fileName }, { new: true });
     res.json({ message: "Okay", updateUser });
  }
 
}

const updateCoverPics = async(req, res) => {
    if (req.fileUploadError) {
    res.status(422).json({message:"in-valid file"})
    } else {
      let imageURL = []
      console.log(req.files);
      for (let i = 0; i < req.files.length; i++) {
        imageURL.push(`${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.files[i].filename}`);
        // 
      }
    //
      console.log(imageURL);
    const updateUser = await userModel.findByIdAndUpdate(req.user._id, { coverPics: imageURL }, { new: true });
     res.json({ message: "Okay",updateUser });
  }
}


const uploadCV = (req, res) => {
  console.log(req.file);
  res.json("ay7ag")
}


const addPost = async (req, res) => {
  let { title, desc } = req.body;

  let addedPost = await postModel.insertMany({ title, desc, userId: req.user._id });
  res.json({ message: "Added", addedPost });
}


const addComment = async (req, res) => {
  const { title } = req.body
  const  postID  = req.params.id;
  let addedComment = await commentModel.insertMany({ title, userId : req.user._id});
console.log(addedComment,"Asdasd");
  let addCommentToPost = await postModel.findOneAndUpdate({ _id: postID }, { $push: { commentsIds: addedComment[0]._id } }, { new: true });

  res.json({ message: "Done", addCommentToPost });
  // console.log(addedComment);
}


const getAllPosts =async (req, res) => {
  const allPosts = await postModel.find({}).populate({
    path: "commentsIds",
  });
  res.json({message:"Done", allPosts})
}

module.exports = { getAllPosts,addComment, updateUser, getMessages, updateProfilePic, updateCoverPics, uploadCV, addPost };