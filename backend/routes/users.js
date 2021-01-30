const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.patch('/users/me/avatar', editAvatar);
router.patch('/users/me', editUser);

module.exports = router;
