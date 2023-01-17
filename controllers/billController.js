const billModel = require("../models/billModel");

const addBillController = async (req, res) => {
  const newBill = new billModel(req.body);
  await newBill.save();
  res.send("Bill Created Successfully");
  try {
  } catch (error) {
    res.send("error", error);
    console.log(error);
  }
};

const getBillsController = async (req, res) => {
  try {
    const bills = await billModel.find();
    res.status(200).send(bills);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addBillController, getBillsController };
