const router = require('express').Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  })
}), createCard);

router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
