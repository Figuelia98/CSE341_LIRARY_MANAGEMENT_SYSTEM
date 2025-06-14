const mongodb = require('../db/connection');
const { genreSchema } = require('../helpers/body_validation');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const mongoose = require('mongoose');
const listGenres = async (req, res, next) => {
  //#swagger.tags=['Genres'];
 try {
    const cursor = await mongodb.getDb().db().collection('Genres').find();
    const genres = await cursor.toArray();

    if (!genres || genres.length === 0) {
      throw createError(404, 'No genres found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(genres);
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};
const getGenre = async (req, res, next) => {
   //#swagger.tags=['Genres'];
  const genreId = new ObjectId(req.params.id);
  try{
   const result = await mongodb.getDb().db().collection('Genres').find({_id:genreId});
   console.log(result);
   if(result){
    result.toArray().then((genre) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(genre[0]);
  });
   }
    else{
      throw createError(404, "No genre found");
     }
 
  }
  catch(error){
   console.log(JSON.stringify(error));
   if(error instanceof mongoose.CastError){
      next(createError(400,"Invalid genre Id"));
      return;
      }
      next(error);
  }
};
const createGenre = async (req,res,next)=>{
//#swagger.tags=['Genres'];
const genre = {
 name: req.body.name,
  description: req.body.description
}
try{
 const result = await genreSchema.validateAsync(req.body);
 const response = await mongodb.getDb().db().collection('Genres').insertOne(genre);

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
const updateGenre = async (req,res,next)=>{
//#swagger.tags=['Genres'];
const genreId = new ObjectId(req.params.id)
const genre = {
  name: req.body.name,
  description: req.body.description
}
try{
const result = await genreSchema.validateAsync(req.body);
  const response = await mongodb.getDb().db().collection('Genres').replaceOne({_id:genreId},genre);
  if(response.modifiedCount === 0){
    throw createError(404, "No genre found");
  }
  res.status(204).send();
}
catch(error){
if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
}
if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid genre ID'));
    }
next(error)
}
 

};
const deleteGenre = async (req,res)=>{
//#swagger.tags=['Genres'];
const genreId = new ObjectId(req.params.id)

try{
   const response = await mongodb.getDb().db().collection('Genres').deleteOne({_id:genreId});
  if(response.deletedCount === 0){
      throw createError(404, "No genre found");
    
  }
 res.status(204).send();
}catch(error){
    if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid genre ID'));
    }
    next(error);
}
 

};

module.exports = {
   listGenres,
   getGenre,
   createGenre,
   updateGenre,
   deleteGenre,

 };