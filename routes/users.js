const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../UserScheme');


router.get("/sign-up", (req, res) => res.render("sign-up-form", {validate: true, user: req.user, data_messages: null, member: null, admin: null}));


router.post("/sign-up", (req, res, next) => {

  // Password confirmation
  if(req.body.password !== req.body.passwordConfirmation){
    res.render("sign-up-form", {validate: true, user: req.user, data_messages: null, member: null, admin: null })
    return
  };

  // Validate Secret codes
  let membership = false, adminstate = false;
  if(req.body.secret === 'Membership0202'){
    membership = true;
  };
  if(req.body.secret === 'Admin0202'){
    membership = true;
    adminstate = true;
  };


  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return console.log(err);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      member: membership,
      admin: adminstate
    });

    user.save((err) => {
      if (err) return next(err);
    });
    res.redirect("/");
    

  });
});


router.get("/joinClub", (req, res) => res.render("joinClub", {completed: false, user: req.user, data_messages: null, member: null, admin: null}));


router.post("/joinClub", (req, res) => {

  if(req.body.tryJoinClub === 'Membership0202'){
    User.findOneAndUpdate({username: req.body.username}, {member: true}, (err, update) => {
      if(err) return console.log(err);
      console.log(update);
      console.log('Updated.')
    })
  };

  if(req.body.tryJoinAdmin === 'Admin0202'){
    User.findOneAndUpdate({username: req.body.username}, {admin: true}, (err, update) => {
      if(err) return console.log(err);

    })
  };

  if(req.body.tryJoinClub === 'Membership0202' || req.body.tryJoinAdmin === 'Admin0202'){
    res.redirect('/');
  };

  res.render("joinClub", {completed: true, user: req.user, data_messages: null, member: null, admin: null});

});


module.exports = router;
