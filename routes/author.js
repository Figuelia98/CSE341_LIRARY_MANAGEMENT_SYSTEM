const express = require('express');
const createError = require('http-errors');
const authorController = require('../controllers/author');
const router = express.Router();
const{isAuthenticated} = require("../middleware/authenticate");
router.get('/', authorController.listAuthors);
router.get('/:id',authorController.getAuthor);
router.post('/',isAuthenticated, authorController.createAuthor);
router.put('/:id',isAuthenticated, authorController.updateAuthor);
router.delete('/:id',isAuthenticated, authorController.deleteAuthor);
module.exports = router;

