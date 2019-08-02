const express = require('express');
const jwt = require('jsonwebtoken');

const auth = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

router.route('/login').post(auth.basicUser, (req, res) => {
  User.findOne({ _id: req.user.id })
  .exec(async (err, user) => {
    if (err || !user) {
      res.sendStatus(400);
    } else {
      let payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user.toJSON()
      }
      const token = await jwt.sign(payload, auth.jwt.secretOrKey);
      res.json({ token, user });
    }
  });
});

module.exports = router;
