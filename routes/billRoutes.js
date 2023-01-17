const express = require("express");
const {
  addBillController,
  getBillsController,
} = require("../controllers/billController");

const router = express.Router();

router.post("/add-bill", addBillController);

router.get("/get-bill", getBillsController);

module.exports = router;
