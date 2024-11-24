// backend/app.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const sequelize = require('./db');
const postRoutes = require('./routes/posts');
const path = require('path');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Дозволити запити з фронтенду
  credentials: true,
}));
app.use(express.json());

// Middleware для логування запитів
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Маршрути
app.use('/posts', postRoutes);

// Обробка статичних файлів (для зображень)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Синхронізація бази даних та запуск серверу
sequelize.sync({ alter: true }) // Використання 'alter: true' для внесення змін у схему без втрати даних
  .then(() => {
    console.log('Database & tables synchronized!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
