var express = require('express');
var router = express.Router();

const userMiddleWare = require ('../controladores/user-middleware');
const authValidator = require ('../controladores/auth'); 

router.get('/', function (req, res) {
  res.sendFile('../bedInFrontEnd/index.html');
});

router.post('/login', 
  [userMiddleWare.authenticateUser,    
    userMiddleWare.checkUserLogged,
    userMiddleWare.checkUserType,
    userMiddleWare.logInitSesion], 
  function(req,res,next) {  
    const userData = {
      name : req.user.name,
      username : req.user.userName,
      type : req.user.type,
      id: req.user._id,
      data : req.user.data,
      institucionCode : req.user.osCode ? req.user.osCode : req.user.hospitalCode,
      rol : req.user.rol
      // req.user.instCode= data.osCode;
    }
  res.send(userData);
});

// router.get('/login', authValidator.isLoggedIn, function(req, res) {
//   res.send(req.user)
// })

router.get('/logout', userMiddleWare.logEndSesion, function(req, res, next) {
  req.logout();
  req.session.destroy(function (err) {
      if(err) return res.send(err);
      return res.send({
          success:true,
      });
 });
});

router.put('/forceLogout',userMiddleWare.logEndSesion, function(req, res, next) {
    return res.send({
    success:true,
  });
});

module.exports = router;