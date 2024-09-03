import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  // Get the uploaded image filename
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename // Store image filename in the database
  });

  try {
    // Save the food item to the database
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    // Retrieve all food items from the database
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    // Find the food item by ID
    const food = await foodModel.findById(req.body.id);
    
    // Delete the image file associated with the food item
    fs.unlink(`uploads/${food.image}`, () => {});

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
