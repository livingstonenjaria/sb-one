const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/checkauth');

const Userlogin = require('../controllers/userlogin');
const Userregister = require('../controllers/userregister');
const Users = require('../controllers/allusers');
const Singleuser = require('../controllers/singleuser');
// Root
router.get('/', (req, res) => res.send('Welcome To Swift!'));
// POST Reqeusts
router.post('/signup', Userregister.user_signup);
router.post('/authenticate', Userlogin.user_login);
// GET Reqeusts
router.get('/users', Users.users_get_all);
router.get('/user/:userid', Singleuser.user_get_single_user);

// router.delete('/:userId', checkAuth, UserController.user_delete_user);

module.exports = router;
