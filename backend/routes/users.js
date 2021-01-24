const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', editUser);
router.patch('/users/me/avatar', editAvatar);

module.exports = router;
