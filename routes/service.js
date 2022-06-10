const ServiceController = require("../controllers/serviceController");

const router = require("express").Router();

router.post("/", ServiceController.addService);
router.get("/", ServiceController.getService);
router.put("/:id", ServiceController.updateService);
router.delete("/:id", ServiceController.deleteService);

module.exports = router;
