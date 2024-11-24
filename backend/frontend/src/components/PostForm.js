// backend/frontend/src/components/PostForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

function PostForm({ onPostCreated }) {
  const [post, setPost] = useState({
    title: '',
    description: '',
    author: '',
    image: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPost({ ...post, image: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('description', post.description);
      formData.append('author', post.author);
      if (post.image) {
        formData.append('image', post.image);
      }

      const response = await axios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created:', response.data);
      onPostCreated(response.data);
      setPost({
        title: '',
        description: '',
        author: '',
        image: null,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);

    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="post-form-container">
      {!isOpen ? (
        <div className="add-post-bar" onClick={handleToggle}>
          <span><i className="fas fa-plus-circle"></i> Add Post</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`post-form ${isOpen ? 'open' : ''}`}
        >
          <div className="form-header">
            <h2>Add New Post</h2>
            <button type="button" className="close-button" onClick={handleToggle}>
              &times;
            </button>
          </div>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default PostForm;
