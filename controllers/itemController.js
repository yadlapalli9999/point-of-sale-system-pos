const itemModel = require("../models/itemModel");
const getAllItemsController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};

const addItemController = async (req, res) => {
  const newItem = new itemModel(req.body);
  await newItem.save();
  res.status(201).send("Item Created Successfully");
  try {
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const editItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findByIdAndUpdate({ _id: itemId }, req.body, { new: true });
    res.status(201).json("Item Updated Successfully");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("Deleted Successfully");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};
module.exports = {
  getAllItemsController,
  addItemController,
  editItemController,
  deleteItemController,
};
