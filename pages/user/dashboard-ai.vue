<script setup>
import { ref, onMounted, computed } from 'vue';
import { LogtoClient } from '@logto/nuxt';

const logto = LogtoClient();
const isAuthenticated = computed(() => logto.isAuthenticated);
const user = computed(() => logto.user);

const activeTab = ref('profile');
const isLoading = ref(true);
const error = ref(null);
const userSettings = ref({
  notifications: {
    email: true,
    site: true
  },
  privacy: {
    publicProfile: true,
    showActivity: false
  },
  theme: 'system'
});

// Mock activity data (in a real app, fetch this from your API)
const recentActivity = ref([
  { id: 1, type: 'login', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), details: 'Login from Chrome on macOS' },
  { id: 2, type: 'comment', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), details: 'Commented on a blog post' },
  { id: 3, type: 'upload', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), details: 'Uploaded 3 new photos' },
  { id: 4, type: 'login', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), details: 'Login from Safari on iPhone' }
]);

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const saveSettings = () => {
  // In a real app, you would save these settings to your backend
  alert('設定已保存');
};

const signOut = async () => {
  await logto.signOut();
};

onMounted(async () => {
  try {
    isLoading.value = true;
    // Here you would typically fetch user data or settings from your API
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (err) {
    error.value = '無法載入用戶數據';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="account-panel">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <div class="loader"></div>
      <p>載入中...</p>
    </div>

    <!-- Not authenticated view -->
    <div v-else-if="!isAuthenticated" class="auth-required">
      <div class="icon">👤</div>
      <h2>請先登入</h2>
      <p>你需要登入才能訪問用戶面板</p>
      <NuxtLink to="/login" class="btn-primary">前往登入</NuxtLink>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container">
      <div class="icon">⚠️</div>
      <h2>發生錯誤</h2>
      <p>{{ error }}</p>
      <button @click="location.reload()" class="btn-primary">重試</button>
    </div>

    <!-- Authenticated view -->
    <div v-else class="panel-content">
      <div class="panel-header">
        <div class="user-info">
          <div class="avatar" v-if="user.picture">
            <img :src="user.picture" alt="Profile picture">
          </div>
          <div class="avatar placeholder" v-else>
            {{ user.name?.charAt(0) || 'U' }}
          </div>
          <div class="user-details">
            <h2>{{ user.name || '用戶' }}</h2>
            <p>{{ user.email || '' }}</p>
          </div>
        </div>
        <button @click="signOut" class="btn-logout">登出</button>
      </div>

      <div class="panel-nav">
        <button 
          @click="setActiveTab('profile')" 
          :class="['nav-btn', { active: activeTab === 'profile' }]"
        >
          個人資料
        </button>
        <button 
          @click="setActiveTab('settings')" 
          :class="['nav-btn', { active: activeTab === 'settings' }]"
        >
          帳戶設定
        </button>
        <button 
          @click="setActiveTab('activity')" 
          :class="['nav-btn', { active: activeTab === 'activity' }]"
        >
          近期活動
        </button>
        <button 
          @click="setActiveTab('uploads')" 
          :class="['nav-btn', { active: activeTab === 'uploads' }]"
        >
          上傳管理
        </button>
      </div>

      <div class="tab-content">
        <!-- Profile tab -->
        <div v-if="activeTab === 'profile'" class="profile-tab">
          <div class="section">
            <h3>個人資料</h3>
            <div class="profile-details">
              <div class="detail-row" v-if="user.name">
                <div class="detail-label">名稱</div>
                <div class="detail-value">{{ user.name }}</div>
              </div>
              <div class="detail-row" v-if="user.email">
                <div class="detail-label">電子郵件</div>
                <div class="detail-value">{{ user.email }}</div>
              </div>
              <div class="detail-row" v-if="user.username">
                <div class="detail-label">用戶名</div>
                <div class="detail-value">{{ user.username }}</div>
              </div>
              <div class="detail-row" v-if="user.id">
                <div class="detail-label">用戶 ID</div>
                <div class="detail-value user-id">{{ user.id }}</div>
              </div>
            </div>
          </div>

          <div class="section connected-accounts" v-if="user.identities">
            <h3>關聯帳戶</h3>
            <div class="account-list">
              <div class="account-item" v-for="(value, key) in user.identities" :key="key">
                <div class="account-icon">
                  <i class="bi" :class="`bi-${key}`"></i>
                </div>
                <div class="account-info">
                  <div class="account-name">{{ key }}</div>
                  <div class="account-connected">已連接</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings tab -->
        <div v-if="activeTab === 'settings'" class="settings-tab">
          <div class="section">
            <h3>通知設定</h3>
            <div class="settings-group">
              <div class="setting-item">
                <div class="setting-label">
                  <span>電子郵件通知</span>
                  <span class="setting-description">接收重要更新和通知</span>
                </div>
                <label class="toggle">
                  <input type="checkbox" v-model="userSettings.notifications.email">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-item">
                <div class="setting-label">
                  <span>網站通知</span>
                  <span class="setting-description">在網站上顯示通知</span>
                </div>
                <label class="toggle">
                  <input type="checkbox" v-model="userSettings.notifications.site">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="section">
            <h3>隱私設定</h3>
            <div class="settings-group">
              <div class="setting-item">
                <div class="setting-label">
                  <span>公開個人資料</span>
                  <span class="setting-description">其他用戶可以查看你的個人資料</span>
                </div>
                <label class="toggle">
                  <input type="checkbox" v-model="userSettings.privacy.publicProfile">
                  <span class="toggle-slider"></span>
                </label>
              </div>
              <div class="setting-item">
                <div class="setting-label">
                  <span>顯示活動</span>
                  <span class="setting-description">在個人資料頁面顯示你的活動</span>
                </div>
                <label class="toggle">
                  <input type="checkbox" v-model="userSettings.privacy.showActivity">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="section">
            <h3>主題設定</h3>
            <div class="theme-options">
              <label class="theme-option">
                <input type="radio" v-model="userSettings.theme" value="light">
                <span class="theme-box light-theme">
                  <span class="theme-check" v-if="userSettings.theme === 'light'">✓</span>
                </span>
                <span class="theme-label">淺色模式</span>
              </label>
              <label class="theme-option">
                <input type="radio" v-model="userSettings.theme" value="dark">
                <span class="theme-box dark-theme">
                  <span class="theme-check" v-if="userSettings.theme === 'dark'">✓</span>
                </span>
                <span class="theme-label">深色模式</span>
              </label>
              <label class="theme-option">
                <input type="radio" v-model="userSettings.theme" value="system">
                <span class="theme-box system-theme">
                  <span class="theme-check" v-if="userSettings.theme === 'system'">✓</span>
                </span>
                <span class="theme-label">系統預設</span>
              </label>
            </div>
          </div>

          <div class="settings-actions">
            <button @click="saveSettings" class="btn-primary">保存設定</button>
          </div>
        </div>

        <!-- Activity tab -->
        <div v-if="activeTab === 'activity'" class="activity-tab">
          <h3>近期活動</h3>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
              <div class="activity-icon" :class="activity.type">
                <i class="bi" :class="{
                  'bi-box-arrow-in-right': activity.type === 'login',
                  'bi-chat-dots': activity.type === 'comment',
                  'bi-cloud-upload': activity.type === 'upload'
                }"></i>
              </div>
              <div class="activity-details">
                <div class="activity-header">
                  <h4>{{ activity.type === 'login' ? '登入' : activity.type === 'comment' ? '評論' : '上傳' }}</h4>
                  <time>{{ formatDate(activity.timestamp) }}</time>
                </div>
                <p class="activity-description">{{ activity.details }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Uploads tab -->
        <div v-if="activeTab === 'uploads'" class="uploads-tab">
          <div class="section">
            <h3>檔案上傳</h3>
            <p>在這裡管理和上傳你的檔案</p>
            <div class="upload-actions">
              <NuxtLink to="/user/upload" class="btn-primary">
                <i class="bi bi-cloud-upload"></i> 上傳新檔案
              </NuxtLink>
            </div>
          </div>
          
          <div class="section">
            <h3>上傳歷史</h3>
            <p class="empty-state">
              <i class="bi bi-folder"></i>
              暫無上傳記錄
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-panel {
  max-width: 900px;
  margin: 2rem auto;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

/* Loading state */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #3f8cff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Not authenticated view */
.auth-required {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.auth-required .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.auth-required h2 {
  margin-bottom: 0.5rem;
}

.auth-required p {
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Error state */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.error-container .icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff4d4d;
}

/* Panel content */
.panel-content {
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar.placeholder {
  background: linear-gradient(135deg, #3f8cff, #2c5fee);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details h2 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
}

.user-details p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.btn-logout {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Navigation */
.panel-nav {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  padding: 0 1rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.panel-nav::-webkit-scrollbar {
  display: none;
}

.nav-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  position: relative;
  white-space: nowrap;
}

.nav-btn.active {
  color: white;
}

.nav-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #3f8cff;
  border-radius: 3px 3px 0 0;
}

.nav-btn:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

/* Tab content */
.tab-content {
  padding: 1.5rem;
}

.section {
  margin-bottom: 2rem;
}

.section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Profile tab */
.profile-details {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.detail-row {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  padding: 1rem;
  width: 30%;
  min-width: 120px;
  background: rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.detail-value {
  padding: 1rem;
  flex: 1;
}

.user-id {
  font-family: monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.connected-accounts .account-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.account-item {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
}

.account-icon {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.account-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.account-connected {
  font-size: 0.75rem;
  color: #4cd964;
}

/* Settings tab */
.settings-group {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  display: flex;
  flex-direction: column;
}

.setting-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.25rem;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #3f8cff;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

/* Theme options */
.theme-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.theme-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.theme-box {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 2px solid transparent;
  position: relative;
  transition: all 0.2s;
}

.theme-option input:checked + .theme-box {
  border-color: #3f8cff;
}

.light-theme {
  background: #f5f5f5;
}

.dark-theme {
  background: #121212;
}

.system-theme {
  background: linear-gradient(to right, #f5f5f5 50%, #121212 50%);
}

.theme-check {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3f8cff;
  font-size: 1.5rem;
}

.theme-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.settings-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

/* Activity tab */
.activity-list {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.activity-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.25rem;
}

.activity-icon.login {
  background: rgba(76, 217, 100, 0.15);
  color: #4cd964;
}

.activity-icon.comment {
  background: rgba(90, 200, 250, 0.15);
  color: #5ac8fa;
}

.activity-icon.upload {
  background: rgba(255, 204, 0, 0.15);
  color: #ffcc00;
}

.activity-details {
  flex: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.375rem;
}

.activity-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.activity-header time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.activity-description {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Uploads tab */
.upload-actions {
  margin-top: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.empty-state i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* Buttons */
.btn-primary {
  background: #3f8cff;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2c5fee;
}

.btn-primary i {
  margin-right: 0.5rem;
}

/* Responsive styles */
@media (max-width: 768px) {
  .account-panel {
    margin: 1rem;
    border-radius: 8px;
  }
  
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .btn-logout {
    margin-top: 1rem;
  }
  
  .user-details {
    margin-top: 0.5rem;
  }
  
  .detail-row {
    flex-direction: column;
  }
  
  .detail-label {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .connected-accounts .account-list {
    grid-template-columns: 1fr;
  }
  
  .activity-header {
    flex-direction: column;
  }
  
  .activity-header time {
    margin-top: 0.25rem;
  }
}
</style>