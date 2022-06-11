const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../api/Models/user");
const auth_jwt = require("../../api/Middleware/auth");


//get all users from database 
router.get('/all',async (req,res)=>{ 
  const users = await User.findAll();
  console.log(users.every(user => user instanceof User));
  res.send(JSON.stringify(users, null, 2));
})


//get user by id and password
router.get('/:id',async (req,res)=>{
  const user = await User.findByPk(req.params.id);
  if(!user){
    return res.status(404).send({
      message: "User not found!"
    });
  }
  res.send(JSON.stringify(user, null, 2));
}) 


//delete user by id and password
router.delete('/delete/:id',auth_jwt,async (req,res)=>{
  
  if(req.params !== req.id)
  {
    return res.status(401).send({
      message: "You are not authorized to delete this user!"
    });
  }
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.send({
    message: "User deleted successfully!"
  });
})


//update password by id and password
router.put("/update/password/:id",auth_jwt, async (req, res) => {
  if(!Boolean(req.params.id,req.id))
  {
    return res.status(401).send({
      message: "You are not authorized to update this user!"
    });
  }
  const user = await User.findByPk(req.params.id);
  const {oldPassword,newPassword } = req.body;
  const verify_oldPassword = await bcrypt.compare(req.body.oldPassword, user.Password);
  if (!verify_oldPassword) {
    return res.status(400).send({
      message: "Old password is incorrect!"
    });
  }
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(newPassword, salt);
  await user.update({ Password: hash }, {
    where: {
      id: req.params.id
    }
  });
  res.send({
    message: "Password updated successfully!",
    user: user
  });
});

router.get("/", (req, res) => {
  res.send("This is user page");
});

module.exports = router;
