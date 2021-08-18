const { Router } = require('express');
const { findItemsByName, getItemById } = require('../controllers/item');
const router = Router();

router.get(
  '/search',
  findItemsByName
)

router.get(
  '/:id',
  getItemById
)

module.exports = router;