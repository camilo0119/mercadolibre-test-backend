const { Router } = require('express');
const { findCategoryById } = require('../controllers/category');
const router = Router();

router.get(
  '/:id',
  findCategoryById
)

module.exports = router;