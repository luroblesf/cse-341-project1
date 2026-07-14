const isAuthenticated = require("../middleware/authenticate");

const router = require("express").Router();

const groupsController = require("../controllers/groups");

const { groupValidationRules, validate } = require("../middleware/validator");

// #swagger.tags = ['Groups']
router.get("/", groupsController.getAll);

router.get("/:id", groupsController.getSingle);

router.post("/", isAuthenticated, groupValidationRules(), validate, groupsController.createGroup);

router.put("/:id", isAuthenticated, groupValidationRules(), validate, groupsController.updateGroup);

router.delete("/:id", isAuthenticated, groupsController.deleteGroup);


module.exports = router;