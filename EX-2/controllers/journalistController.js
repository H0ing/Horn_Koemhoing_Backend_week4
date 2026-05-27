import { articles, journalists, categories } from "./../models/data.js";

// getAllJournalists
const getAllJournalists = (req, res) => {
  res.json(journalists);
}

// getJournalist
const getJournalist = (req, res) => {
  const id = parseInt(req.params.id);
  const journalist = journalists.find(j => j.id === id);
  if (!journalist) {
    return res.status(404).json({ "error": "Journalist not found" });
  }
  res.json(journalist);
}

// createJournalist
const createJournalist = (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ "error": "Name and email are required" });
  }
  
  // Check for duplicate email
  const existingJournalist = journalists.find(j => j.email.toLowerCase() === email.toLowerCase());
  if (existingJournalist) {
    return res.status(400).json({ "error": "Email already exists" });
  }
  
  // Generate new ID
  const newId = journalists.length > 0 ? Math.max(...journalists.map(j => j.id)) + 1 : 1;
  
  const newJournalist = {
    id: newId,
    name,
    email
  };
  
  journalists.push(newJournalist);
  res.status(201).json(newJournalist);
}

// updateJournalist
const updateJournalist = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const journalistIndex = journalists.findIndex(j => j.id === id);
  if (journalistIndex === -1) {
    return res.status(404).json({ "error": "Journalist not found" });
  }
  
  // Check for duplicate email (excluding current journalist)
  if (email) {
    const existingJournalist = journalists.find(j => 
      j.email.toLowerCase() === email.toLowerCase() && j.id !== id
    );
    if (existingJournalist) {
      return res.status(400).json({ "error": "Email already exists" });
    }
    journalists[journalistIndex].email = email;
  }
  
  if (name) {
    journalists[journalistIndex].name = name;
  }
  
  res.json(journalists[journalistIndex]);
}

// deleteJournalist
const deleteJournalist = (req, res) => {
  const id = parseInt(req.params.id);
  
  // Check if journalist has articles
  const articlesByJournalist = articles.filter(a => a.journalistId === id);
  if (articlesByJournalist.length > 0) {
    return res.status(400).json({ 
      "error": `Cannot delete journalist. They have written ${articlesByJournalist.length} article(s). Reassign those articles first.` 
    });
  }
  
  const journalistIndex = journalists.findIndex(j => j.id === id);
  if (journalistIndex === -1) {
    return res.status(404).json({ "error": "Journalist not found" });
  }
  
  const deletedJournalist = journalists.splice(journalistIndex, 1)[0];
  res.json({ 
    "message": "Journalist deleted successfully", 
    "deletedJournalist": deletedJournalist 
  });
}

// getArticlesWithJournalist
const getArticlesWithJournalist = (req, res) => {
  const id = parseInt(req.params.id);
  
  const journalist = journalists.find(j => j.id === id);
  if (!journalist) {
    return res.status(404).json({ "error": "Journalist not found" });
  }
  
  const journalistArticles = articles.filter(a => a.journalistId === id);
  
  // Enrich articles with category names
  const enrichedArticles = journalistArticles.map(article => {
    const category = categories.find(c => c.id === article.categoryId);
    return {
      ...article,
      categoryName: category ? category.name : null
    };
  });
  
  res.json({
    journalist: journalist,
    articles: enrichedArticles,
    totalArticles: enrichedArticles.length
  });
}

export {
  getAllJournalists,
  getJournalist,
  createJournalist,
  updateJournalist,
  deleteJournalist,
  getArticlesWithJournalist
};