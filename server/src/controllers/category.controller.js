import Category from "../models/category.model.js";
import chalk from "chalk";

// Create a new Category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();

    console.log(chalk.green("Category created successfully:", newCategory));
    return res
      .status(201)
      .json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.log(chalk.red("Error:", error.message));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Category
export const getAllCategory = async (req, res) => {
  try {
    const categorys = await Category.find(
      {},
      {
        name: true,
        description: true,
      }
    );
    console.log(chalk.green("Categorys fetched successfully:", categorys));
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      categorys,
    });
  } catch (error) {
    console.log(chalk.red("Error:", error.message));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    console.log(chalk.green("Category deleted successfully:", category));
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(chalk.red("Error:", error.message));
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
