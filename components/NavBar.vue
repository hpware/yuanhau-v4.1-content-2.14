<script setup lang="ts">
import { animate } from "motion";
import { ref, onMounted, onUnmounted } from "vue";
import { useLogtoUser } from '#imports';
const user = useLogtoUser();

const isOpen = ref(false);
const menuButton = ref(null);
const sidebar = ref(null);
const mouseOverNav = ref(false);

// Toggle sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Close sidebar
const closeSidebar = () => {
  isOpen.value = false;
};

// Close sidebar when clicking outside
const handleClickOutside = (event) => {
  if (isOpen.value && 
      sidebar.value && 
      !sidebar.value.contains(event.target) && 
      menuButton.value && 
      !menuButton.value.contains(event.target)) {
    closeSidebar();
  }
};

// Close sidebar on escape key
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeSidebar();
  }
};

// Handle mouse enter/leave for hover effects
const handleMouseEnter = () => {
  mouseOverNav.value = true;
};

const handleMouseLeave = () => {
  mouseOverNav.value = false;
};

// Set up event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="navbar-component">
    <!-- Menu Toggle Button -->
    <div class="menu-button-container" ref="menuButton">
      <button 
        @click="toggleSidebar" 
        :class="['menu-button', { 'active': isOpen }]" 
        aria-label="Toggle menu"
      >
        <span class="menu-icon"></span>
      </button>
    </div>

    <!-- Sidebar Overlay (only shows when sidebar is open) -->
    <Transition name="fade">
      <div v-if="isOpen" class="sidebar-overlay" @click="closeSidebar"></div>
    </Transition>

    <!-- Sidebar Navigation -->
    <Transition name="slide">
      <div 
        v-if="isOpen" 
        ref="sidebar" 
        class="sidebar" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave"
      >
        <div class="sidebar-header">
          <h2 class="sidebar-title">吳元皓</h2>
        </div>

        <nav class="sidebar-nav">
          <NuxtLink to="/" @click="closeSidebar" class="nav-item">
            <i class="bi bi-house"></i>
            <span>首頁</span>
          </NuxtLink>
          
          <NuxtLink to="/about" @click="closeSidebar" class="nav-item">
            <i class="bi bi-info-circle"></i>
            <span>關於我</span>
          </NuxtLink>
          
          <NuxtLink to="/posts/" @click="closeSidebar" class="nav-item">
            <i class="bi bi-journal-text"></i>
            <span>Blog</span>
          </NuxtLink>
    
          
          <NuxtLink to="/images/" @click="closeSidebar" class="nav-item">
            <i class="bi bi-images"></i>
            <span>相簿</span>
          </NuxtLink>
          
          <NuxtLink to="/recommendations" @click="closeSidebar" class="nav-item">
            <i class="bi bi-chat-left-text"></i>
            <span>建議/聯絡</span>
          </NuxtLink>
        </nav>
        <div class="user">
          <div v-if="!Boolean(user)">
            <i class="bi bi-person"></i>
          </div>
          <div v-else>
            <NuxtLink to="/user/" @click="closeSidebar" class="user-item">
            <i class="bi bi-person"></i>
            <span></span>
          </NuxtLink>
          </div>
          <a :href="`/sign-${ user ? 'out' : 'in' }`"> 登 {{ user ? '出' : '入' }} </a>
        </div>
        <div class="sidebar-footer">
          <div class="social-links">
            <a href="https://github.com/hpware" target="_blank" aria-label="GitHub">
              <i class="bi bi-github"></i>
            </a>
            <a href="https://yhw.tw/ig" target="_blank" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://yhw.tw/threads" target="_blank" aria-label="Threads">
              <i class="bi bi-threads"></i>
            </a>
            <a href="https://twitter.com/ictechz" target="_blank" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="mailto:hw@yuanhau.com" target="_blank" aria-label="Email">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
          <div class="copyright">版權 © 2025 吳元皓</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Base Styles */
.navbar-component {
  --sidebar-width: 280px;
  --sidebar-bg: rgba(39, 76, 131, 0.569);
  --sidebar-text: #ffffff;
  --sidebar-hover: #e0e0e0;
  --sidebar-active: hsl(208, 100%, 73%);
  --transition-speed: 0.3s;
  --backdrop-blur: 10px;
}
.menu-button-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1001;
}

.menu-button {
  background: rgba(255, 255, 255, 0);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; 
  transition: all 0.3s ease;
  left:2px;
}

.menu-button:hover {
  transform: scale(1.05);
}


.menu-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.menu-button.active .menu-icon {
  background: transparent;
}

.menu-button.active .menu-icon::before {
  transform: rotate(45deg);
}

.menu-button.active .menu-icon::after {
  transform: rotate(-45deg);
}

/* Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 230px;
  height: 100vh;
  background: var(--sidebar-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
  transition: background-color var(--transition-speed);
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-button {
  background: transparent;
  color: var(--sidebar-text);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all var(--transition-speed);
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--sidebar-hover);
}

.sidebar-title {
  color: var(--sidebar-text);
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

/* Navigation Items */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--sidebar-text);
  font-size:0.9em;
  text-decoration: none;
  transition: all var(--transition-speed);
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--sidebar-hover);
  border-left-color: var(--sidebar-hover);
}

.nav-item.router-link-active {
  color: var(--sidebar-active);
  border-left-color: var(--sidebar-active);
  background: rgba(255, 255, 255, 0.05);
}

.nav-item i {
  font-size: 1.25rem;
  margin-right: 1rem;
  width: 24px;
  text-align: center;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align:center;
  align-items:center;
  justify-content: center;
}

.social-links {
  display: flex;
  gap: 1rem;
  text-align:center;
  align-items:center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.social-links a {
  color: var(--sidebar-text);
  font-size: 1.25rem;
}

.social-links a:hover {
  color: #b7b7b7;
}

.copyright {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-speed);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: transform var(--transition-speed) ease-out;
}

.slide-leave-active {
  transition: transform var(--transition-speed) ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.user {
  margin-bottom: 10px;
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: rgb(182, 182, 182)
  }
}

@media (max-width: 768px) {
  .navbar-component {
    --sidebar-width: 100%;
  }
  
  .sidebar {
    border-radius: 0;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .copyright {
    text-align: center;
  }
}
</style>
