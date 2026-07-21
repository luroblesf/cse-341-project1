const router = require("express").Router();

const groupsController = require("../controllers/groups");
const { groupValidationRules, validate } = require("../middleware/validator");
const auth = require('../middleware/authenticate');

// #swagger.tags = ['Groups']

router.get("/", groupsController.getAll);

router.get("/:id", groupsController.getSingle);

router.post("/", auth.isAuthenticated, groupValidationRules(), validate, groupsController.createGroup);

router.put("/:id", auth.isAuthenticated, groupValidationRules(), validate, groupsController.updateGroup);

router.delete("/:id", auth.isAuthenticated, groupsController.deleteGroup);

module.exports = router;