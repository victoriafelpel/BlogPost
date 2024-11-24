// backend/frontend/src/components/PostList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';

function PostList({ onEdit, onDelete }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);

    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-content">
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.author}</p>
              <p>{post.description}</p>
              <p><strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}</p>
              <div className="post-actions">
                <button onClick={() => onEdit(post)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
              </div>
            </div>
            {post.image && (
              <img src={`http://localhost:5000${post.image}`} alt={post.title} className="post-image" />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
