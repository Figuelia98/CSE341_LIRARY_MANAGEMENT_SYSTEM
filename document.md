
# 📘 Project Team 13 Contributions – Library Management System API

This document outlines the **division of work and individual contributions** for the Node.js-based Library Management System API, developed as part of the CSE41 Software Development course at BYU–Idaho.

## 👥 Team Members & Assigned Tasks

---

### 🔹 **Figuelia Ya’Sin**

**Role & Contributions:**

* ✅ Implemented **HTTP GET** endpoints:

  * `GET /books` – Fetch all books
  * `GET /books/:id` – Fetch a single book
  * `GET /authors`, `GET /borrowers`, etc.
* ✅ Developed **HTTP POST** routes for creating:

  * New books, authors, genres, and borrowers
* ✅ Created and initialized the **Git repository**, structured the branches, and shared access with all team members
* ✅ Handled **video presentation** showcasing:

  * All API routes functioning
  * Live MongoDB data manipulation
  * API documentation via Swagger UI

---

### 🔹 **Onesmus Dzidzai Maenzanise**

**Role & Contributions:**

* ✅ Implemented **HTTP PUT** routes:

  * `PUT /books/:id`, `PUT /authors/:id`, etc.
  * Allowed updating of documents in MongoDB
* ✅ Integrated proper validation using Joi for update operations
* ✅ Participated in route testing to ensure correct updates and edge-case handling

---

### 🔹 **Terri-Anne Venter**

**Role & Contributions:**

* ✅ Developed **HTTP DELETE** endpoints:

  * Removed books, authors, genres, and borrowers by ID
* ✅ Initialized the **Node.js project structure**:

  * Configured `package.json`, project scaffolding, environment setup
  * Installed and configured essential packages (Express, Mongoose, etc.)

---

### 🔹 **Greice Franceschetti de Andrade**

**Role & Contributions:**

* ✅ Managed **MongoDB setup**:

  * Created database and collections using MongoDB Atlas
  * Connected the Node.js backend using Mongoose ODM
* ✅ Authored **comprehensive Swagger documentation**:

  * Described all endpoints (GET, POST, PUT, DELETE)
  * Included models, request/response examples, and schemas for clarity

---

## ✅ Summary of Individual Mastery & Contributions

| Team Member                    | GET | POST | PUT | DELETE | MongoDB | Swagger |    Git Repo    | Video |
| ------------------------------ | :-: | :--: | :-: | :----: | :-----: | :-----: | :------------: | :---: |
| **Figuelia Ya’Sin**            |  ✅  |   ✅  |     |        |         |         |        ✅       |   ✅   |
| **Onesmus Dzidzai Maenzanise** |     |      |  ✅  |        |         |         |                |       |
| **Terri-Anne Venter**          |     |      |     |    ✅   |         |         | ✅ (Node setup) |       |
| **Greice F. de Andrade**       |     |      |     |        |    ✅    |    ✅    |                |       |