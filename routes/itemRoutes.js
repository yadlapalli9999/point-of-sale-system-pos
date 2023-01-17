const express = require("express");
const {
  getAllItemsController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemController");
const router = express.Router();

//get all item router
router.get("/get-item", getAllItemsController);

//add-item router
router.post("/add-item", addItemController);

//update-item router
router.put("/edit-item", editItemController);

//delete-item router
router.post("/delete-item", deleteItemController);

module.exports = router;
