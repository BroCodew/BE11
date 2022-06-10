const MenuController = require("../controllers/menuController");
const router = require("express").Router();

router.post("/", MenuController.addMenu);

router.get("/", MenuController.getAllMenu);

/* router.get("/:id", bookController.getABook); */

//UPDATE
router.put("/:id", MenuController.updateMenu);

//DELETE
router.delete("/:id", MenuController.deleteMenu);

module.exports = router;
