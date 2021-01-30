const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', deleteLike);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
