const express = require('express');
const router = express.Router();
const passport = require("passport");
const Messages = require('../MessageScheme');


router.get("/", (req, res) => {

  // get user
  let adminStatus = false, memberStatus = false;
  if(req.user !== undefined){
    adminStatus = req.user.admin === true ? true : false;
    memberStatus = req.user.member === true ? true : false;
  };

  Messages.find({}, (err, data) => {
      if(err) return console.log(err);
      res.render("index", { user: req.user, data_messages: data, member: memberStatus, admin: adminStatus });
  });

});


router.post('/deleteMessage', (req, res) => {

    Messages.findByIdAndDelete({_id: req.body.messageID}, (err, data) => {
      if(err) {console.log('err'); res.redirect('/'); return}
      res.redirect('/');    
    });

});


router.post('/newMessage', (req, res) => {

   const newMsg =  new Messages({
    message: req.body.message,
    author: req.user.username
   });

   newMsg.save((err) => {
    if (err) return next(err);
  });


  const messagesArray = [];
  Messages.find({}, (err, data) => {
      if(err) return console.log(err);
      for (const val of data) {
        messagesArray.push(val);
      };
  });

  res.redirect("/");

});


router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);


router.get("/log-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


module.exports = router;
