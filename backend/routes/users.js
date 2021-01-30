const router = require('express').Router();
const { celebrate, Joi } = require("celebrate");

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

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  })
}), editAvatar);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  })
}), editUser);

module.exports = router;
