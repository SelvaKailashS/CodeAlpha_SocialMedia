// Pulse Social Media - Application Logic
const state = {
  currentUser: JSON.parse(localStorage.getItem('pulse_user') || JSON.stringify({
    id: "user-selva",
    name: "Selva Kailash S",
    username: "selvakailash",
    email: "selvakailash@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    bio: "Full Stack Developer & CodeAlpha Intern | Building scalable web apps with React, Node.js & Cloud 🚀",
    location: "India",
    website: "https://github.com/SelvaKailashS",
    joinedDate: "October 2026",
    following: ["user-sarah", "user-alex"],
    followers: ["user-sarah", "user-alex", "user-david"]
  })),
  token: localStorage.getItem('pulse_token') || 'tok_demo',
  activeTab: 'forYou', // 'forYou', 'following', 'profile'
  viewingProfileId: null,
  activeTag: null,
  searchQuery: '',
  posts: [],
  users: []
};

// Fallback initial data
const fallbackPosts = [
  {
    id: "post-1",
    userId: "user-selva",
    author: {
      id: "user-selva",
      name: "Selva Kailash S",
      username: "selvakailash",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
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
    author: {
      id: "user-sarah",
      name: "Sarah Chen",
      username: "sarahchen_dev",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
    },
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
    author: {
      id: "user-alex",
      name: "Alex Rivera",
      username: "alex_codes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    content: "Benchmarked our Node.js microservices under heavy concurrency today. Optimizing database connection pools and using in-memory caching reduced response latency by 64%! Performance engineering is so rewarding. 🚀",
    image: "",
    tags: ["NodeJS", "Backend", "Performance"],
    likes: ["user-selva", "user-david"],
    comments: [],
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

const fallbackUsers = [
  {
    id: "user-selva",
    name: "Selva Kailash S",
    username: "selvakailash",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Full Stack Developer & CodeAlpha Intern | React, Node.js & Cloud",
    followersCount: 3,
    followingCount: 2
  },
  {
    id: "user-sarah",
    name: "Sarah Chen",
    username: "sarahchen_dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    bio: "Product Designer & UI/UX enthusiast ✨",
    followersCount: 1,
    followingCount: 1
  },
  {
    id: "user-alex",
    name: "Alex Rivera",
    username: "alex_codes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Distributed systems engineer. Writing Go & Rust ⚡",
    followersCount: 1,
    followingCount: 2
  },
  {
    id: "user-david",
    name: "David Kim",
    username: "david_ai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "AI researcher & machine learning developer 🤖",
    followersCount: 0,
    followingCount: 1
  }
];

// DOM Elements
const postsFeed = document.getElementById('postsFeed');
const emptyFeedState = document.getElementById('emptyFeedState');
const profileSection = document.getElementById('profileSection');
const postComposer = document.getElementById('postComposer');
const tabForYou = document.getElementById('tabForYou');
const tabFollowing = document.getElementById('tabFollowing');
const tabProfileView = document.getElementById('tabProfileView');
const activeFilterBanner = document.getElementById('activeFilterBanner');
const filterLabel = document.getElementById('filterLabel');
const feedSearchInput = document.getElementById('feedSearchInput');
const whoToFollowList = document.getElementById('whoToFollowList');
const toastContainer = document.getElementById('toastContainer');

// Modals
const editProfileModal = document.getElementById('editProfileModal');
const authModal = document.getElementById('authModal');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateCurrentUserUI();
  loadUsers();
  loadPosts();
});

// ==================== API / DATA LOAD ====================
async function loadPosts() {
  try {
    const params = new URLSearchParams();
    if (state.activeTab === 'following') params.append('filter', 'following');
    if (state.currentUser) params.append('currentUserId', state.currentUser.id);
    if (state.activeTag) params.append('tag', state.activeTag);
    if (state.searchQuery) params.append('search', state.searchQuery);

    const res = await fetch(`/api/posts?${params.toString()}`);
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    state.posts = data.posts || [];
  } catch (err) {
    console.warn('API unavailable, utilizing local fallback posts:', err);
    let list = JSON.parse(localStorage.getItem('pulse_posts') || JSON.stringify(fallbackPosts));
    if (state.activeTab === 'following' && state.currentUser) {
      list = list.filter(p => state.currentUser.following.includes(p.userId) || p.userId === state.currentUser.id);
    }
    if (state.activeTag) {
      list = list.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === state.activeTag.toLowerCase()));
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(p => p.content.toLowerCase().includes(q) || (p.tags && p.tags.some(t => t.toLowerCase().includes(q))));
    }
    state.posts = list;
  }

  renderPosts();
}

async function loadUsers() {
  try {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      state.users = data.users || [];
    }
  } catch (err) {
    state.users = fallbackUsers;
  }
  renderWhoToFollow();
}

// ==================== RENDERING ====================
function renderPosts() {
  let displayPosts = state.posts;

  if (state.activeTab === 'profile' && state.viewingProfileId) {
    displayPosts = displayPosts.filter(p => p.userId === state.viewingProfileId);
  }

  if (!displayPosts || displayPosts.length === 0) {
    postsFeed.innerHTML = '';
    emptyFeedState.style.display = 'block';
    return;
  }
  emptyFeedState.style.display = 'none';

  postsFeed.innerHTML = displayPosts.map(post => {
    const isLiked = state.currentUser && post.likes && post.likes.includes(state.currentUser.id);
    const likesCount = (post.likes && post.likes.length) || 0;
    const commentsCount = (post.comments && post.comments.length) || 0;
    const author = post.author || {
      name: 'User',
      username: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };

    return `
      <article class="post-card" id="post-${post.id}">
        <div class="post-header">
          <img src="${author.avatar}" alt="${author.name}" class="avatar-sm" onclick="openProfile('${author.id}')" style="cursor:pointer;">
          <div class="post-author-meta">
            <span class="author-name" onclick="openProfile('${author.id}')">${author.name}</span>
            <span class="author-handle" onclick="openProfile('${author.id}')">@${author.username}</span>
            <span class="post-dot">•</span>
            <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
          </div>
        </div>

        <div class="post-body">
          <div class="post-text">${escapeHtml(post.content)}</div>

          ${post.tags && post.tags.length ? `
            <div class="post-tags">
              ${post.tags.map(t => `<span class="tag-badge" onclick="filterByTag('${t}')">#${t}</span>`).join('')}
            </div>
          ` : ''}

          ${post.image ? `
            <div class="post-img-container">
              <img src="${post.image}" alt="Post attachment" loading="lazy">
            </div>
          ` : ''}

          <div class="post-actions-bar">
            <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
              <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
              <span class="like-count">${likesCount}</span>
            </button>

            <button class="action-btn" onclick="toggleComments('${post.id}')">
              <i class="fa-regular fa-comment"></i>
              <span>${commentsCount}</span>
            </button>

            <button class="action-btn" onclick="sharePost('${post.id}')">
              <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
          </div>

          <!-- Comments Accordion -->
          <div class="comments-accordion" id="comments-${post.id}" style="display:none;">
            <div class="comment-input-row">
              <input type="text" id="comment-input-${post.id}" placeholder="Write a constructive reply..." onkeypress="if(event.key==='Enter') submitComment('${post.id}')">
              <button class="btn btn-sm btn-primary" onclick="submitComment('${post.id}')">Reply</button>
            </div>
            <div class="comments-list" id="comments-list-${post.id}">
              ${post.comments ? post.comments.map(c => `
                <div class="comment-item">
                  <img src="${c.userAvatar}" alt="${c.userName}" class="avatar-sm" style="width:28px; height:28px;">
                  <div>
                    <span class="comment-author-name">${c.userName}</span>
                    <span class="comment-time">${formatTimeAgo(c.timestamp)}</span>
                    <p style="margin-top:2px;">${escapeHtml(c.content)}</p>
                  </div>
                </div>
              `).join('') : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderWhoToFollow() {
  const currentId = state.currentUser ? state.currentUser.id : null;
  const filtered = state.users.filter(u => u.id !== currentId);

  whoToFollowList.innerHTML = filtered.map(u => {
    const isFollowing = state.currentUser && state.currentUser.following && state.currentUser.following.includes(u.id);
    return `
      <div class="follow-card-item">
        <div class="follow-card-user" onclick="openProfile('${u.id}')">
          <img src="${u.avatar}" alt="${u.name}" class="avatar-sm">
          <div class="follow-card-names">
            <strong>${u.name}</strong>
            <span>@${u.username}</span>
          </div>
        </div>
        <button class="btn btn-sm ${isFollowing ? 'btn-following' : 'btn-outline'}" onclick="toggleFollow('${u.id}')">
          ${isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    `;
  }).join('');
}

// ==================== POST CREATION ====================
async function handlePublishPost() {
  const contentInput = document.getElementById('postContentInput');
  const imageUrlInput = document.getElementById('postImageUrl');
  const tagsInput = document.getElementById('postTagsInput');
  const content = contentInput.value.trim();

  if (!content) {
    showToast('Please type something to post!', 'error');
    return;
  }

  if (!state.currentUser) {
    showToast('Please sign in to publish posts!', 'error');
    authModal.classList.add('open');
    return;
  }

  const tags = tagsInput.value.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
  const image = imageUrlInput.value.trim();

  const newPostPayload = {
    userId: state.currentUser.id,
    content,
    image,
    tags
  };

  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPostPayload)
    });

    let createdPost;
    if (res.ok) {
      const data = await res.json();
      createdPost = data.post;
    } else {
      createdPost = {
        id: 'post-' + Date.now(),
        ...newPostPayload,
        author: {
          id: state.currentUser.id,
          name: state.currentUser.name,
          username: state.currentUser.username,
          avatar: state.currentUser.avatar
        },
        likes: [],
        comments: [],
        timestamp: new Date().toISOString()
      };
    }

    state.posts.unshift(createdPost);
    // Sync localStorage
    const local = JSON.parse(localStorage.getItem('pulse_posts') || JSON.stringify(fallbackPosts));
    local.unshift(createdPost);
    localStorage.setItem('pulse_posts', JSON.stringify(local));

    // Reset Form
    contentInput.value = '';
    imageUrlInput.value = '';
    tagsInput.value = '';
    document.getElementById('imageUrlBox').style.display = 'none';
    document.getElementById('tagInputBox').style.display = 'none';

    showToast('Post published to the feed!');
    renderPosts();
  } catch (err) {
    showToast('Failed to publish post: ' + err.message, 'error');
  }
}

// ==================== LIKE & FOLLOW INTERACTIONS ====================
window.toggleLike = async function(postId) {
  if (!state.currentUser) {
    showToast('Please sign in to like posts', 'error');
    authModal.classList.add('open');
    return;
  }

  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const currentId = state.currentUser.id;
  const idx = post.likes.indexOf(currentId);
  if (idx === -1) {
    post.likes.push(currentId);
  } else {
    post.likes.splice(idx, 1);
  }

  renderPosts();

  try {
    await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentId })
    });
  } catch (err) {
    console.warn('API like sync failed, persisted locally');
  }
};

window.toggleComments = function(postId) {
  const box = document.getElementById(`comments-${postId}`);
  if (!box) return;
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
};

window.submitComment = async function(postId) {
  if (!state.currentUser) {
    showToast('Please sign in to comment', 'error');
    authModal.classList.add('open');
    return;
  }

  const input = document.getElementById(`comment-input-${postId}`);
  const content = input.value.trim();
  if (!content) return;

  const post = state.posts.find(p => p.id === postId);
  if (!post) return;

  const newComment = {
    id: 'c-' + Date.now(),
    userId: state.currentUser.id,
    userName: state.currentUser.name,
    userAvatar: state.currentUser.avatar,
    content,
    timestamp: new Date().toISOString()
  };

  if (!post.comments) post.comments = [];
  post.comments.push(newComment);
  input.value = '';

  renderPosts();
  // Keep comment box open
  document.getElementById(`comments-${postId}`).style.display = 'block';

  try {
    await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: state.currentUser.id, content })
    });
  } catch (err) {
    console.warn('Comment API failed, saved locally');
  }
};

window.toggleFollow = async function(targetUserId) {
  if (!state.currentUser) {
    showToast('Please sign in to follow creators', 'error');
    authModal.classList.add('open');
    return;
  }

  if (targetUserId === state.currentUser.id) {
    showToast('You cannot follow yourself!', 'error');
    return;
  }

  const followingList = state.currentUser.following || [];
  const idx = followingList.indexOf(targetUserId);
  let isFollowing = false;

  if (idx === -1) {
    followingList.push(targetUserId);
    isFollowing = true;
    showToast('Followed creator!');
  } else {
    followingList.splice(idx, 1);
    isFollowing = false;
    showToast('Unfollowed creator.');
  }

  state.currentUser.following = followingList;
  localStorage.setItem('pulse_user', JSON.stringify(state.currentUser));

  renderWhoToFollow();
  if (state.activeTab === 'profile' && state.viewingProfileId === targetUserId) {
    openProfile(targetUserId);
  }
  if (state.activeTab === 'following') {
    loadPosts();
  }

  try {
    await fetch(`/api/users/${targetUserId}/follow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserId: state.currentUser.id })
    });
  } catch (err) {
    console.warn('Follow API failed, saved locally');
  }
};

window.sharePost = function(postId) {
  navigator.clipboard?.writeText(window.location.href);
  showToast('Link copied to clipboard!');
};

// ==================== PROFILE VIEW ====================
window.openProfile = async function(userId) {
  state.activeTab = 'profile';
  state.viewingProfileId = userId;

  tabForYou.classList.remove('active');
  tabFollowing.classList.remove('active');
  tabProfileView.style.display = 'block';
  tabProfileView.classList.add('active');
  profileSection.style.display = 'block';
  postComposer.style.display = 'none';

  let profile = null;
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (res.ok) {
      const data = await res.json();
      profile = data.profile;
    }
  } catch (err) {
    console.warn('Profile fetch fallback');
  }

  if (!profile) {
    if (state.currentUser && state.currentUser.id === userId) {
      profile = state.currentUser;
    } else {
      profile = fallbackUsers.find(u => u.id === userId) || {
        name: "Developer",
        username: "dev",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
        bio: "CodeAlpha Web Developer",
        followersCount: 0,
        followingCount: 0
      };
    }
  }

  document.getElementById('profileCoverImg').src = profile.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80";
  document.getElementById('profileAvatarImg').src = profile.avatar;
  document.getElementById('profileFullName').textContent = profile.name;
  document.getElementById('profileHandle').textContent = `@${profile.username}`;
  document.getElementById('profileBio').textContent = profile.bio || "No bio yet.";
  document.getElementById('profileLocation').textContent = profile.location || "Remote";
  document.getElementById('profileFollowingCount').textContent = (profile.following ? profile.following.length : profile.followingCount) || 0;
  document.getElementById('profileFollowersCount').textContent = (profile.followers ? profile.followers.length : profile.followersCount) || 0;

  const userPosts = state.posts.filter(p => p.userId === userId);
  document.getElementById('profilePostsCount').textContent = userPosts.length;

  const actionsWrap = document.getElementById('profileActionsWrap');
  if (state.currentUser && state.currentUser.id === userId) {
    actionsWrap.innerHTML = `<button class="btn btn-outline" id="editProfileBtn"><i class="fa-regular fa-pen-to-square"></i> Edit Profile</button>`;
    document.getElementById('editProfileBtn').onclick = openEditProfileModal;
  } else {
    const isFollowing = state.currentUser && state.currentUser.following && state.currentUser.following.includes(userId);
    actionsWrap.innerHTML = `
      <button class="btn ${isFollowing ? 'btn-following' : 'btn-primary'}" onclick="toggleFollow('${userId}')">
        ${isFollowing ? 'Following' : 'Follow'}
      </button>
    `;
  }

  renderPosts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function openEditProfileModal() {
  if (!state.currentUser) return;
  document.getElementById('editName').value = state.currentUser.name;
  document.getElementById('editBio').value = state.currentUser.bio || '';
  document.getElementById('editLocation').value = state.currentUser.location || '';
  document.getElementById('editAvatar').value = state.currentUser.avatar;
  editProfileModal.classList.add('open');
}

async function handleSaveProfile(e) {
  e.preventDefault();
  const name = document.getElementById('editName').value;
  const bio = document.getElementById('editBio').value;
  const location = document.getElementById('editLocation').value;
  const avatar = document.getElementById('editAvatar').value || state.currentUser.avatar;

  state.currentUser.name = name;
  state.currentUser.bio = bio;
  state.currentUser.location = location;
  state.currentUser.avatar = avatar;

  localStorage.setItem('pulse_user', JSON.stringify(state.currentUser));
  updateCurrentUserUI();
  editProfileModal.classList.remove('open');
  showToast('Profile updated successfully!');
  openProfile(state.currentUser.id);

  try {
    await fetch(`/api/users/${state.currentUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio, location, avatar })
    });
  } catch (err) {
    console.warn('Profile save API failed');
  }
}

// ==================== USER AUTH UI ====================
function updateCurrentUserUI() {
  const u = state.currentUser;
  if (u) {
    document.getElementById('sidebarName').textContent = u.name;
    document.getElementById('sidebarUsername').textContent = `@${u.username}`;
    document.getElementById('sidebarAvatar').src = u.avatar;
    document.getElementById('composerAvatar').src = u.avatar;
    document.getElementById('mobileAuthBtn').textContent = 'Sign Out';
  } else {
    document.getElementById('sidebarName').textContent = 'Guest User';
    document.getElementById('sidebarUsername').textContent = '@guest';
    document.getElementById('mobileAuthBtn').textContent = 'Sign In';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const emailOrUsername = document.getElementById('loginIdentifier').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    state.currentUser = data.user;
    state.token = data.token;
    localStorage.setItem('pulse_user', JSON.stringify(state.currentUser));
    localStorage.setItem('pulse_token', state.token);

    updateCurrentUserUI();
    authModal.classList.remove('open');
    showToast(`Welcome back, ${state.currentUser.name}!`);
    loadPosts();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    state.currentUser = data.user;
    localStorage.setItem('pulse_user', JSON.stringify(state.currentUser));

    updateCurrentUserUI();
    authModal.classList.remove('open');
    showToast(`Account created! Welcome, ${state.currentUser.name}!`);
    loadPosts();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function handleLogout() {
  state.currentUser = null;
  state.token = null;
  localStorage.removeItem('pulse_user');
  localStorage.removeItem('pulse_token');
  updateCurrentUserUI();
  showToast('You have signed out.');
}

// ==================== FILTERING & SEARCH ====================
window.filterByTag = function(tag) {
  state.activeTag = tag;
  activeFilterBanner.style.display = 'flex';
  filterLabel.textContent = `#${tag}`;
  loadPosts();
};

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const diffSec = Math.floor((new Date() - date) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  tabForYou.addEventListener('click', () => {
    state.activeTab = 'forYou';
    tabForYou.classList.add('active');
    tabFollowing.classList.remove('active');
    tabProfileView.style.display = 'none';
    profileSection.style.display = 'none';
    postComposer.style.display = 'block';
    loadPosts();
  });

  tabFollowing.addEventListener('click', () => {
    state.activeTab = 'following';
    tabFollowing.classList.add('active');
    tabForYou.classList.remove('active');
    tabProfileView.style.display = 'none';
    profileSection.style.display = 'none';
    postComposer.style.display = 'block';
    loadPosts();
  });

  document.getElementById('myProfileNavBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentUser) openProfile(state.currentUser.id);
    else authModal.classList.add('open');
  });

  document.getElementById('toggleImgBtn').addEventListener('click', () => {
    const box = document.getElementById('imageUrlBox');
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
  });

  document.getElementById('closeImgInputBtn').addEventListener('click', () => {
    document.getElementById('imageUrlBox').style.display = 'none';
    document.getElementById('postImageUrl').value = '';
  });

  document.getElementById('toggleTagBtn').addEventListener('click', () => {
    const box = document.getElementById('tagInputBox');
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
  });

  document.getElementById('publishPostBtn').addEventListener('click', handlePublishPost);

  document.getElementById('clearFilterBtn').addEventListener('click', () => {
    state.activeTag = null;
    activeFilterBanner.style.display = 'none';
    loadPosts();
  });

  feedSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    loadPosts();
  });

  document.querySelectorAll('.trending-item').forEach(item => {
    item.addEventListener('click', () => {
      filterByTag(item.dataset.tag);
    });
  });

  // Edit Profile
  document.getElementById('editProfileForm').addEventListener('submit', handleSaveProfile);
  document.getElementById('closeEditProfileModal').addEventListener('click', () => {
    editProfileModal.classList.remove('open');
  });

  // Auth Toggle
  document.getElementById('authToggleBtn').addEventListener('click', () => {
    if (state.currentUser) handleLogout();
    else authModal.classList.add('open');
  });

  document.getElementById('mobileAuthBtn').addEventListener('click', () => {
    if (state.currentUser) handleLogout();
    else authModal.classList.add('open');
  });

  document.getElementById('tabLogin').addEventListener('click', () => {
    document.getElementById('tabLogin').classList.add('active');
    document.getElementById('tabRegister').classList.remove('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  });

  document.getElementById('tabRegister').addEventListener('click', () => {
    document.getElementById('tabRegister').classList.add('active');
    document.getElementById('tabLogin').classList.remove('active');
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  });

  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
  document.getElementById('closeAuthModal').addEventListener('click', () => {
    authModal.classList.remove('open');
  });
}
