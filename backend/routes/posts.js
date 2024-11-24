// backend/routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Налаштування сховища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Папка для збереження зображень
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Унікальне ім'я файлу
  },
});

const upload = multer({ storage: storage });

// Отримати всі пости
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Створити новий пост з зображенням
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = await Post.create({ title, description, author, image });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Оновити пост з можливістю зміни зображення
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title !== undefined ? title : post.title;
    post.description = description !== undefined ? description : post.description;
    post.author = author !== undefined ? author : post.author;
    post.image = image !== undefined ? image : post.image;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Видалити пост
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Видалення файлу зображення (опціонально)
    if (post.image) {
      const fs = require('fs');
      const filePath = path.join(__dirname, '..', post.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        }
      });
    }

    await post.destroy();
    res.json({ success: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
