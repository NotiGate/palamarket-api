const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.post("/create", orderController.createOrder);
router.put("/farm/:id", orderController.farmOrder)
router.put("/ready/:id", orderController.readyOrder)
router.put("/delivery/:id", orderController.deliveryOrder)
router.put("/delivered/:id", orderController.deliveredOrder)
router.delete("/delete/:id", orderController.deleteOrder)
router.put("/pay/:id", orderController.payementOrder);

module.exports = router;
