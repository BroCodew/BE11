const subMenuController = require("../controllers/subMenuController");

const router = require("express").Router();

//ADD
router.post("/", subMenuController.addSubMenu);

//GET ALL
router.get("/", subMenuController.getAllSubMenu);

//UPDATE AN
router.put("/:id", subMenuController.updateAuthor);

//DELETE
router.delete("/:id", subMenuController.deleteAuthor);

module.exports = router;
