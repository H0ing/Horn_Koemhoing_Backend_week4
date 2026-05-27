import { articles, journalists, categories } from "./../models/data.js";

// getAllArticles
const getAllArticles = (req, res) => {
  res.json(articles);
}

// getArticle
const getArticle = (req, res) => {
  const id = parseInt(req.params.id); 
  const article = articles.find(u => u.id === id);
  if(!article) return res.status(404).json({"error": "article not found"});
  res.json(article);
}

// createArticle
const createArticle = (req, res) => {
  const { title, content, journalistId, categoryId } = req.body;
  
  // Validate required fields
  if (!title || !content || !journalistId || !categoryId) {
    return res.status(400).json({ 
      "error": "Missing required fields: title, content, journalistId, categoryId" 
    });
  }
  
  // Check if journalist exists
  const journalistExists = journalists.find(j => j.id === journalistId);
  if (!journalistExists) {
    return res.status(400).json({ "error": "Journalist not found" });
  }
  
  // Check if category exists
  const categoryExists = categories.find(c => c.id === categoryId);
  if (!categoryExists) {
    return res.status(400).json({ "error": "Category not found" });
  }
  
  // Generate new ID
  const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
  
  // Create new article
  const newArticle = {
    id: newId,
    title,
    content,
    journalistId,
    categoryId
  };
  
  articles.push(newArticle);
  res.status(201).json(newArticle);
}

// updateArticle
const updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, journalistId, categoryId } = req.body;
  
  // Find article to update
  const articleIndex = articles.findIndex(a => a.id === id);
  if (articleIndex === -1) {
    return res.status(404).json({ "error": "Article not found" });
  }
  
  // Check if journalist exists (if being updated)
  if (journalistId !== undefined) {
    const journalistExists = journalists.find(j => j.id === journalistId);
    if (!journalistExists) {
      return res.status(400).json({ "error": "Journalist not found" });
    }
  }
  
  // Check if category exists (if being updated)
  if (categoryId !== undefined) {
    const categoryExists = categories.find(c => c.id === categoryId);
    if (!categoryExists) {
      return res.status(400).json({ "error": "Category not found" });
    }
  }
  
  // Update only provided fields
  const updatedArticle = { ...articles[articleIndex] };
  if (title !== undefined) updatedArticle.title = title;
  if (content !== undefined) updatedArticle.content = content;
  if (journalistId !== undefined) updatedArticle.journalistId = journalistId;
  if (categoryId !== undefined) updatedArticle.categoryId = categoryId;
  
  articles[articleIndex] = updatedArticle;
  res.json(updatedArticle);
}

// deleteArticle
const deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);
  
  const articleIndex = articles.findIndex(a => a.id === id);
  if (articleIndex === -1) {
    return res.status(404).json({ "error": "Article not found" });
  }
  
  const deletedArticle = articles.splice(articleIndex, 1)[0];
  res.json({ 
    "message": "Article deleted successfully", 
    "deletedArticle": deletedArticle 
  });
}

export {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
};