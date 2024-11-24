// backend/frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import EditPostForm from './components/EditPostForm';
import './App.css';

function App() {
  const [editingPost, setEditingPost] = useState(null);

  const handlePostCreated = () => {

    window.location.reload();
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleEditComplete = () => {
    setEditingPost(null);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="App">
      <Navbar /> {}
      <div className="content">
        {editingPost ? (
          <EditPostForm post={editingPost} onEditComplete={handleEditComplete} />
        ) : (
          <PostForm onPostCreated={handlePostCreated} />
        )}
        <PostList onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
