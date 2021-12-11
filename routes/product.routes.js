const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.post("/create", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct)
router.put("/update/:id", productController.updateProduct);

module.exports = router;
