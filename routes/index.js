const express = require('express');
const passport = require('passport');
const router = express.Router();
router.use('/',require('./swagger'));
router.use('/authors',require('./author'));
router.use('/borrowers',require('./borrower'));
router.use('/genres',require('./genre'));
router.use('/books',require('./book'));
router.get('/login',passport.authenticate('github'),(req,res)=>{});
router.get('/logout', function(req,res,next){
    req.logout(function(err){
      if(err){ return next(err);}
      res.redirect('/')
    });
});
module.exports = router;
