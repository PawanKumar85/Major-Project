import Category from "../models/category.model.js";
import chalk from "chalk";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log(chalk.green(CategorysDetails));

    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;

    //get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    //get courses for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    //TODO: Top Selling Courses

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
