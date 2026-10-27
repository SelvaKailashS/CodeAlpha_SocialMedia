const crypto = require('crypto');

const hashPassword = (pw) => crypto.createHash('sha256').update(pw).digest('hex');

let users = [
  {
    id: "user-selva",
    name: "Selva Kailash S",
    username: "selvakailash",
    email: "selvakailash@example.com",
    passwordHash: hashPassword('password123'),
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    bio: "Full Stack Developer & CodeAlpha Intern | Passionate about building modern scalable web applications, React, Node.js & Cloud 🚀",
    location: "India",
    website: "https://github.com/SelvaKailashS",
    joinedDate: "October 2026",
    following: ["user-sarah", "user-alex"],
    followers: ["user-sarah", "user-alex", "user-david"]
  },
  {
    id: "user-sarah",
    name: "Sarah Chen",
    username: "sarahchen_dev",
    email: "sarah@example.com",
    passwordHash: hashPassword('password123'),
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80",
    bio: "Product Designer & UI/UX enthusiast. Crafting joyful digital experiences and aesthetic design systems ✨",
    location: "San Francisco, CA",
    website: "https://sarahchen.design",
    joinedDate: "January 2026",
    following: ["user-selva"],
    followers: ["user-selva"]
  },
  {
    id: "user-alex",
    name: "Alex Rivera",
    username: "alex_codes",
    email: "alex@example.com",
    passwordHash: hashPassword('password123'),
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    bio: "Distributed systems engineer. Writing Go, Rust, and JavaScript. Open-source contributor ⚡",
    location: "Austin, TX",
    website: "https://alexrivera.dev",
    joinedDate: "March 2026",
    following: ["user-selva", "user-sarah"],
    followers: ["user-selva"]
  },
  {
    id: "user-david",
    name: "David Kim",
    username: "david_ai",
    email: "david@example.com",
    passwordHash: hashPassword('password123'),
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    bio: "AI researcher & machine learning developer. Exploring deep neural architectures and intelligent agents 🤖",
    location: "Toronto, Canada",
    website: "https://davidkim.ai",
    joinedDate: "July 2026",
    following: ["user-selva"],
    followers: []
  }
];

let posts = [
  {
    id: "post-1",
    userId: "user-selva",
    content: "Excited to share that I am working on the CodeAlpha Full Stack Web Development tasks! Just built a full-stack mini social media platform and an e-commerce store with Express and modern vanilla JavaScript. Full API integration and Vercel ready! 💻✨ #CodeAlpha #WebDev #FullStack #CodingJourney",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    tags: ["CodeAlpha", "WebDev", "FullStack"],
    likes: ["user-sarah", "user-alex", "user-david"],
    comments: [
      {
        id: "c-101",
        userId: "user-sarah",
        userName: "Sarah Chen",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
        content: "Awesome work Selva! The UI looks super clean and responsive. Keep crushing it! 🔥",
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
      },
      {
        id: "c-102",
        userId: "user-alex",
        userName: "Alex Rivera",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        content: "Great architecture on the Express backend! Are you deploying to Vercel?",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ],
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "post-2",
    userId: "user-sarah",
    content: "Refactoring our UI component library to adopt modern CSS variables and smooth view transitions. Clean typography and whitespace make such a huge difference in user perception! What is your favorite CSS design trend right now? 🎨",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    tags: ["Design", "UIUX", "CSS"],
    likes: ["user-selva", "user-alex"],
    comments: [
      {
        id: "c-103",
        userId: "user-selva",
        userName: "Selva Kailash S",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        content: "Totally agree! Minimalist glassmorphic subtle borders and solid typography are unmatched.",
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ],
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: "post-3",
    userId: "user-alex",
    content: "Benchmarked our Node.js microservices under heavy concurrency today. Optimizing database connection pools and using in-memory caching reduced response latency by 64%! Performance engineering is so rewarding. 🚀",
    image: "",
    tags: ["NodeJS", "Backend", "Performance"],
    likes: ["user-selva", "user-david"],
    comments: [],
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

module.exports = {
  // Posts
  getPosts: ({ filter, tag, search, currentUserId }) => {
    let result = [...posts];

    if (tag) {
      result = result.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p => 
        p.content.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (filter === 'following' && currentUserId) {
      const currentUser = users.find(u => u.id === currentUserId);
      if (currentUser) {
        result = result.filter(p => currentUser.following.includes(p.userId) || p.userId === currentUserId);
      }
    }

    // Attach author details
    return result.map(p => {
      const author = users.find(u => u.id === p.userId) || {
        name: "Unknown User",
        username: "unknown",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
      };
      return {
        ...p,
        author: {
          id: author.id,
          name: author.name,
          username: author.username,
          avatar: author.avatar
        }
      };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  getPostById: (id) => {
    const p = posts.find(item => item.id === id);
    if (!p) return null;
    const author = users.find(u => u.id === p.userId) || {};
    return {
      ...p,
      author: {
        id: author.id,
        name: author.name,
        username: author.username,
        avatar: author.avatar
      }
    };
  },

  createPost: ({ userId, content, image, tags }) => {
    const newPost = {
      id: 'post-' + Date.now(),
      userId,
      content,
      image: image || '',
      tags: tags || [],
      likes: [],
      comments: [],
      timestamp: new Date().toISOString()
    };
    posts.unshift(newPost);
    const author = users.find(u => u.id === userId) || {};
    return {
      ...newPost,
      author: {
        id: author.id,
        name: author.name,
        username: author.username,
        avatar: author.avatar
      }
    };
  },

  toggleLike: (postId, userId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    const idx = post.likes.indexOf(userId);
    let liked = false;
    if (idx === -1) {
      post.likes.push(userId);
      liked = true;
    } else {
      post.likes.splice(idx, 1);
      liked = false;
    }
    return { liked, likesCount: post.likes.length, likes: post.likes };
  },

  addComment: (postId, { userId, content }) => {
    const post = posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    const user = users.find(u => u.id === userId);
    const newComment = {
      id: 'c-' + Date.now(),
      userId,
      userName: user ? user.name : 'Anonymous',
      userAvatar: user ? user.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      content,
      timestamp: new Date().toISOString()
    };
    post.comments.push(newComment);
    return newComment;
  },

  // Users & Profiles
  getUsers: () => {
    return users.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
      bio: u.bio,
      location: u.location,
      followersCount: u.followers.length,
      followingCount: u.following.length
    }));
  },

  getUserProfile: (userId) => {
    const user = users.find(u => u.id === userId || u.username === userId);
    if (!user) return null;
    const userPosts = posts.filter(p => p.userId === user.id).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      cover: user.cover,
      bio: user.bio,
      location: user.location,
      website: user.website,
      joinedDate: user.joinedDate,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      followers: user.followers,
      following: user.following,
      postsCount: userPosts.length,
      posts: userPosts
    };
  },

  toggleFollow: (targetUserId, currentUserId) => {
    if (targetUserId === currentUserId) {
      throw new Error("You cannot follow yourself");
    }
    const targetUser = users.find(u => u.id === targetUserId);
    const currentUser = users.find(u => u.id === currentUserId);
    if (!targetUser || !currentUser) throw new Error("User not found");

    const idx = currentUser.following.indexOf(targetUserId);
    let isFollowing = false;
    if (idx === -1) {
      currentUser.following.push(targetUserId);
      if (!targetUser.followers.includes(currentUserId)) {
        targetUser.followers.push(currentUserId);
      }
      isFollowing = true;
    } else {
      currentUser.following.splice(idx, 1);
      const followerIdx = targetUser.followers.indexOf(currentUserId);
      if (followerIdx !== -1) {
        targetUser.followers.splice(followerIdx, 1);
      }
      isFollowing = false;
    }

    return {
      isFollowing,
      targetFollowersCount: targetUser.followers.length,
      currentFollowingCount: currentUser.following.length
    };
  },

  updateProfile: (userId, updates) => {
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error("User not found");
    if (updates.name) user.name = updates.name;
    if (updates.bio) user.bio = updates.bio;
    if (updates.avatar) user.avatar = updates.avatar;
    if (updates.location) user.location = updates.location;
    return user;
  },

  registerUser: ({ name, username, email, password }) => {
    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9_]/g, '');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === cleanUsername);
    if (existing) {
      throw new Error('User already exists with this email or username.');
    }
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      username: cleanUsername,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanUsername}`,
      cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      bio: "Just joined Spark Social! 👋",
      location: "Earth",
      website: "",
      joinedDate: "October 2026",
      following: ["user-selva"],
      followers: []
    };
    users.push(newUser);
    return newUser;
  },

  loginUser: ({ emailOrUsername, password }) => {
    const q = emailOrUsername.toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === q || u.username.toLowerCase() === q);
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid email/username or password.');
    }
    const token = 'tok_' + Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        followersCount: user.followers.length,
        followingCount: user.following.length
      }
    };
  }
};
