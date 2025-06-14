const mongodb = require('../db/connection');
const{bookSchema} = require('../helpers/body_validation');
const createError = require('http-errors');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const listBooks = async (req, res, next) => {
  //#swagger.tags=['Books'];
  try{
   const result = await mongodb.getDb().db().collection('Books').find();
   if(result){
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
   }
   else{
    throw createError(404, "No book found");
   }
  }
  catch(error){
   console.log(JSON.stringify(error));
   
   next(error);
  }
 
};
const getBook = async (req, res, next) => {
   //#swagger.tags=['Books'];
  try {
    const bookId = new ObjectId(req.params.id);

    const book = await mongodb.getDb().db().collection('Books').findOne({ _id: bookId });

    if (!book) {
      throw createError(404, 'Book not found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (error) {
    console.log(JSON.stringify(error));
    
    if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid book ID'));
    }

    next(error);
  }
  
};
const createBook = async (req,res,next)=>{
   //#swagger.tags=['Books'];
 const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
    publicationYear: req.body.publicationYear,
    availableCopies: req.body.availableCopies,
    totalCopies: req.body.totalCopies
}

try{
 const result = await bookSchema.validateAsync(req.body);

  const response = await mongodb.getDb().db().collection('Books').insertOne(book);
  if(response.acknowledged > 0){
    res.status(204).send();
  }
}catch(error){
 console.log(JSON.stringify(error));
if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
}
next(error)

}


};
const updateBook = async (req,res,next)=>{
//#swagger.tags=['Books'];
const bookId = new ObjectId(req.params.id)
const book = {
  title: req.body.title,
  author: req.body.author,
  genre: req.body.genre,
  isbn: req.body.isbn,
  publicationYear: req.body.publicationYear,
  availableCopies: req.body.availableCopies,
  totalCopies: req.body.totalCopies
}
 try{
 const result = await bookSchema.validateAsync(req.body);
  const response = await mongodb.getDb().db().collection('Books').replaceOne({_id:bookId},book);
  if (!response) {
      throw createError(404, 'Book not found');
  }
  if(response.modifiedCount > 0){
    res.status(204).send();
  }
 }catch(error){
   console.log(JSON.stringify(error));
   if(error instanceof mongoose.CastError){
   next(createError(400,"Invalid book Id"));
   return;
   }
   if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
    }
   next(error);
 }


};
const deleteBook = async (req,res,next)=>{
//#swagger.tags=['Books'];
try {
    const bookId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection('Books').deleteOne({ _id: bookId });

    if (response.deletedCount === 0) {
      // No book was deleted because none matched the ID
      throw createError(404, 'book not found');
    }

    // Success: book deleted
    res.status(204).send(); // 204 = No Content
  } catch (error) {
    console.log(JSON.stringify(error));

    if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid book ID'));
    }

    next(error);
  }
};

module.exports = {
   listBooks,
   getBook,
   createBook,
   updateBook,
   deleteBook,

 };