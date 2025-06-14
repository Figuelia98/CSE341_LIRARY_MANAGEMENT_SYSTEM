const mongodb = require('../db/connection');
const { borrowerSchema } = require('../helpers/body_validation');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const mongoose = require('mongoose');
const listBorrowers = async (req, res, next) => {
  //#swagger.tags=['Borrowers'];
 try {
    const cursor = await mongodb.getDb().db().collection('Borrowers').find();
    const borrowers = await cursor.toArray();

    if (!borrowers || borrowers.length === 0) {
      throw createError(404, 'No borrower found');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(borrowers);
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};
const getBorrower = async (req, res, next) => {
   //#swagger.tags=['Borrowers'];
  const borrowerId = new ObjectId(req.params.id);
  try{
   const result = await mongodb.getDb().db().collection('Borrowers').find({_id:borrowerId});
   console.log(result);
   if(result){
    result.toArray().then((borrower) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(borrower[0]);
  });
   }
    else{
      throw createError(404, "No borrower found");
     }
 
  }
  catch(error){
   console.log(JSON.stringify(error));
   if(error instanceof mongoose.CastError){
      next(createError(400,"Invalid borrower Id"));
      return;
      }
      next(error);
  }
};
const createBorrower = async (req,res,next)=>{
//#swagger.tags=['Borrowers'];
const borrower = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phoneNumber: req.body.phoneNumber,
  borrowedBooks: req.body.borrowedBooks, // array of objects
}
try{
 const result = await borrowerSchema.validateAsync(req.body);
 const response = await mongodb.getDb().db().collection('Borrowers').insertOne(borrower);

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
const updateBorrower = async (req,res,next)=>{
//#swagger.tags=['Borrowers'];
const borrowerId = new ObjectId(req.params.id)
const borrower = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  phoneNumber: req.body.phoneNumber,
  borrowedBooks: req.body.borrowedBooks, // array of objects
}
try{
const result = await borrowerSchema.validateAsync(req.body);
  const response = await mongodb.getDb().db().collection('Borrowers').replaceOne({_id:borrowerId},borrower);
  if(response.modifiedCount === 0){
    throw createError(404, "No borrower found");
  }
  res.status(204).send();
}
catch(error){
if(error.name === 'ValidationError'){
  next(createError(422,error.message));
  return;
}
if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid borrower ID'));
    }
next(error)
}
 

};
const deleteBorrower = async (req,res)=>{
//#swagger.tags=['Borrowers'];
const borrowerId = new ObjectId(req.params.id)

try{
   const response = await mongodb.getDb().db().collection('Borrowers').deleteOne({_id:borrowerId});
  if(response.deletedCount === 0){
      throw createError(404, "No borrower found");
    
  }
 res.status(204).send();
}catch(error){
    if (error instanceof mongoose.CastError || error.name === 'BSONTypeError') {
      return next(createError(400, 'Invalid borrower ID'));
    }
    next(error);
}
 

};

module.exports = {
   listBorrowers,
   getBorrower,
   createBorrower,
   updateBorrower,
   deleteBorrower,

 };