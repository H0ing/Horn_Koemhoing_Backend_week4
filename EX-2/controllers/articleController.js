import {articles, journalists, categories} from "./../model/data.js";



// getAllArticles
const getAllArticles = (req, res) => {
  res.json(articles);
}


// getArticle
const getArticle = (req, res) => {
  const id = parseInt(req.param.id); 
  const articel = articles.find(u => u.id === id);
  if(!articel) return res.status(404).json({"error": "artical not found"});
  res.json(articel);
}


// creteArticle
const createArticle = (req, res) => {
  const {title, content, journalistsId, categoryId} = req.body;


}


// updateArticle
const updateArticle = (res, req) => {

  
}

// deleteArticle