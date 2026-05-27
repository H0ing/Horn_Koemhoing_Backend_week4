import { articles, journalists, categories } from "./../models/data.js";

// getAllCategories
const getAllCategories = (req, res) => {
  res.json(categories);
};

// getCategory
const getCategory = (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find((c) => c.id === id);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(category);
};

// createCategory
const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  // Check for duplicate category name
  const existingCategory = categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );
  if (existingCategory) {
    return res.status(400).json({ error: "Category already exists" });
  }

  // Generate new ID
  const newId =
    categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;

  const newCategory = {
    id: newId,
    name,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

// updateCategory
const updateCategory = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  const categoryIndex = categories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }

  // Check for duplicate name (excluding current category)
  const existingCategory = categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== id,
  );
  if (existingCategory) {
    return res.status(400).json({ error: "Category name already exists" });
  }

  categories[categoryIndex].name = name;
  res.json(categories[categoryIndex]);
};

// deleteCategory
const deleteCategory = (req, res) => {
  const id = parseInt(req.params.id);

  // Check if category has articles
  const articlesWithCategory = articles.filter((a) => a.categoryId === id);
  if (articlesWithCategory.length > 0) {
    return res.status(400).json({
      error: `Cannot delete category. It is used by ${articlesWithCategory.length} article(s). Update those articles first.`,
    });
  }

  const categoryIndex = categories.findIndex((c) => c.id === id);
  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Category not found" });
  }

  const deletedCategory = categories.splice(categoryIndex, 1)[0];
  res.json({
    message: "Category deleted successfully",
    deletedCategory: deletedCategory,
  });
};

// getArticlesByCategory
const getArticlesByCategory = (req, res) => {
  const id = parseInt(req.params.id);

  const categoryExists = categories.find((c) => c.id === id);
  if (!categoryExists) {
    return res.status(404).json({ error: "Category not found" });
  }

  const categoryArticles = articles.filter((a) => a.categoryId === id);
  res.json({
    category: categoryExists,
    articles: categoryArticles,
  });
};

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getArticlesByCategory,
};
