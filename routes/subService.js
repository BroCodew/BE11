const subSerivceController = require("../controllers/subServiceController");

const router = require("express").Router();

//ADD
router.post("/", subSerivceController.addSubService);

//GET ALL
router.get("/", subSerivceController.getSubService);

//UPDATE AN
router.put("/:id", subSerivceController.updateSubService);

//DELETE
router.delete("/:id", subSerivceController.deleteSubService);

module.exports = router;
