// frontend/src/components/EditPostForm.js
import React, { useState } from 'react';
import './PostForm.css';

function EditPostForm({ post, onEditComplete }) {
  const [updatedPost, setUpdatedPost] = useState({
    title: post.title,
    description: post.description,
    author: post.author,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setUpdatedPost({ ...updatedPost, image: files[0] });
    } else {
      setUpdatedPost({ ...updatedPost, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', updatedPost.title);
      formData.append('description', updatedPost.description);
      formData.append('author', updatedPost.author);
      if (updatedPost.image) {
        formData.append('image', updatedPost.image);
      }

      const response = await fetch(`/posts/${post.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const editedPost = await response.json();
        console.log('Post updated:', editedPost);
        onEditComplete(); // Завершення редагування та оновлення списку постів
      } else {
        console.error('Error updating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Edit Post</h2>
      <input
        type="text"
        name="title"
        value={updatedPost.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={updatedPost.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="author"
        value={updatedPost.author}
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
      <button type="submit">Update</button>
      <button type="button" onClick={onEditComplete} className="cancel-button">
        Cancel
      </button>
    </form>
  );
}

export default EditPostForm;
