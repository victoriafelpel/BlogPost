// backend/models/Post.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'posts',
  timestamps: true, // Увімкнення timestamp для 'created_at'
  createdAt: 'created_at', // Налаштування імені стовпця для createdAt
  updatedAt: false,
});

module.exports = Post;
