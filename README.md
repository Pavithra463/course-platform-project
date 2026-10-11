# Course Platform

A full-stack web application where students log in and practice programming concepts through a multiple-choice quiz. Scores are saved to a MySQL database for each user.

## Features

- Login with client-side form validation (username, email format, password length)
- Register and login routes in a Node.js and Express backend
- Passwords are hashed with bcrypt before being stored in MySQL
- Programming practice quiz with automatic scoring
- Quiz scores saved to a MySQL `scores` table, linked to the user

## Tech stack

| Part | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MySQL (`mysql2`) |
| Security | bcrypt password hashing, CORS |

## Project structure

```
course-platform-project/
  frontend/
    index.html      login page
    quiz.html       quiz page
    script.js       login validation and login request
    quiz.js         quiz scoring and score saving
    style.css
  backend/
    server.js       register, login and save-score routes
    db.example.js   database connection template
    package.json
```

## Database

Run this in MySQL Workbench or the MySQL command line:

```sql
CREATE DATABASE course_platform;
USE course_platform;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    test_name VARCHAR(100),
    score INT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## How to run

1. Install Node.js and MySQL.
2. Create the database and tables using the SQL above.
3. In the `backend` folder, copy `db.example.js` to `db.js` and put your MySQL password in it. `db.js` is ignored by Git so the password is never uploaded.
4. In the `backend` folder, run:
   ```
   npm install
   node server.js
   ```
   The server starts on `http://localhost:5000`.
5. Create a user by sending a POST request to `http://localhost:5000/register` (for example from Postman) with this JSON body:
   ```json
   { "username": "Pavithra", "email": "test@test.com", "password": "test123" }
   ```
6. Open `frontend/index.html` in a browser, log in with that email and password, and take the quiz.

## API routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/register` | Create a user (password stored as a bcrypt hash) |
| POST | `/login` | Check email and password against the database |
| POST | `/save-score` | Save a quiz score for a user |

## Limitations

- There is no register page yet. Users are created through the `/register` route.
- There are no sessions or tokens. The logged-in username is kept in the browser's local storage, so this is a learning project and not production-ready authentication.
- The backend must be run locally, so there is no live demo.

## Future improvements

- Register page and proper session or token-based login
- Score history page for each user
- More question sets and a timer
- Deployment of the backend and database

## Author

Pavithra A, Information Technology student.
