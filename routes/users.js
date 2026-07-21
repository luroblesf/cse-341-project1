const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validator');
const auth = require('../middleware/authenticate');

// #swagger.tags = ['Users']
router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', auth.isAuthenticated, userValidationRules(), validate, usersController.createUser);

router.put('/:id', auth.isAuthenticated, userValidationRules(), validate, usersController.updateUser);

router.delete('/:id', auth.isAuthenticated, usersController.deleteUser);

module.exports = router;