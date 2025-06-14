const mongodb = require('../db/connection');
const { authorSchema } = require('../helpers/body_validation');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const mongoose = require('mongoose');

const listAuthors = async (req, res, next) => {
  //#swagger.tags=['Authors'];
 try {
    const cursor = await mongodb.getDb().db().collection('Authors').find();
    const authors = await cursor.toArray();

    if (!authors || authors.length === 0) {
      throw createError(404, 'No author found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};
const getAuthor = async (req, res, next) => {
   //#swagger.tags=['Authors'];
  const authorId = new ObjectId(req.params.id);
  try{
   const result = await mongodb.getDb().db().collection('Authors').find({_id:authorId});
   console.log(result);
   if(result){
    result.toArray().then((author) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(author[0]);
  });
   }
    else{
      throw createError(404, "No author found");
     }
 
  }
  catch(error){
   console.log(JSON.stringify(error));
   if(error instanceof mongoose.CastError){
      next(createError(400,"Invalid employee Id"));
      return;
      }
      next(error);
  }
};
const createAuthor = async (req,res,next)=>{
//#swagger.tags=['Authors'];
const author = {
  name: req.body.name,
  biography: req.body.biography,
  birthdate: req.body.birthdate,
  nationality: req.body.nationality,
}
try{
 const result = await authorSchema.validateAsync(req.body);
 const response = await mongodb.getDb().db().collection('Authors').insertOne(author);

if(response.acknowledged > 0){
    res.status(204).send();
 }
}
catch(error){
if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
}
next(error)
  
}

  

};
const updateAuthor = async (req,res,next)=>{
//#swagger.tags=['Authors'];
const authorId = new ObjectId(req.params.id)
const author = {
  name: req.body.name,
  biography: req.body.biography,
  birthdate: req.body.birthdate,
  nationality: req.body.nationality,
}
try{
const result = await authorSchema.validateAsync(req.body);
  const response = await mongodb.getDb().db().collection('Authors').replaceOne({_id:authorId},author);
  if(response.modifiedCount === 0){
    throw createError(404, "No author found");
  }
  res.status(204).send();
}
catch(error){
if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
}
if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid author ID'));
    }
next(error)
}
 

};
const deleteAuthor = async (req,res)=>{
//#swagger.tags=['Authors'];
const authorId = new ObjectId(req.params.id)

try{
   const response = await mongodb.getDb().db().collection('Authors').deleteOne({_id:authorId});
  if(response.deletedCount === 0){
      throw createError(404, "No author found");
    
  }
 res.status(204).send();
}catch(error){
    if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid author ID'));
    }
    next(error);
}
 

};

module.exports = {
  listAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  createAuthor
 };