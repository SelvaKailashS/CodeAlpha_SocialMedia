const express = require('express');
const cors = require('cors');
const db = require('../data/db');

const app = express();

app.use(cors());
app.use(express.json());

// ----------------- Posts Endpoints -----------------
app.get('/api/posts', (req, res) => {
  try {
    const { filter, tag, search, currentUserId } = req.query;
    const posts = db.getPosts({ filter, tag, search, currentUserId });
    res.json({ success: true, count: posts.length, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/posts/:id', (req, res) => {
  try {
    const post = db.getPostById(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/posts', (req, res) => {
  try {
    const { userId, content, image, tags } = req.body;
    if (!userId || !content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'User ID and post content are required' });
    }
    const newPost = db.createPost({ userId, content, image, tags });
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/posts/:id/like', (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: 'User ID required to like' });
    const result = db.toggleLike(req.params.id, userId);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/posts/:id/comments', (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Comment content and userId are required' });
    }
    const comment = db.addComment(req.params.id, { userId, content });
    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ----------------- Users & Profiles Endpoints -----------------
app.get('/api/users', (req, res) => {
  try {
    const users = db.getUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const profile = db.getUserProfile(req.params.id);
    if (!profile) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/users/:id/follow', (req, res) => {
  try {
    const { currentUserId } = req.body;
    if (!currentUserId) return res.status(400).json({ success: false, error: 'currentUserId is required' });
    const result = db.toggleFollow(req.params.id, currentUserId);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const updated = db.updateProfile(req.params.id, req.body);
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ----------------- Auth Endpoints -----------------
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    const user = db.registerUser({ name, username, email, password });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ success: false, error: 'Username/Email and password required' });
    }
    const result = db.loginUser({ emailOrUsername, password });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CodeAlpha Social Media API' });
});

module.exports = app;
