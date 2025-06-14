const Joi = require('@hapi/joi');
const { description } = require('@hapi/joi/lib/base');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string(),
  isbn: Joi.string(),
  publicationYear: Joi.number().integer(),
  availableCopies: Joi.number().integer(),
  totalCopies: Joi.number().integer()
});
const borrowerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phoneNumber: Joi.string(),
  borrowedBooks: Joi.array().items(
    Joi.object({
      bookId: Joi.string().allow(null), // or Joi.objectId() if you're using a custom validator
      borrowDate: Joi.date().allow(null),
      returnDate: Joi.date().allow(null)
    })
  )
});

const genreSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('')
});

const authorSchema = Joi.object({
  name: Joi.string().required(),
  biography: Joi.string().allow(''),
  birthdate: Joi.date(),
  nationality: Joi.string(),
});


module.exports = {
  bookSchema,
  borrowerSchema,
  genreSchema,
  authorSchema
};