import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLiveStore = defineStore('appLiveStore', () => {
  const state = ref({
    layout: 'app',
    is_show_sidebar: false,
    is_show_search: true,
    is_dark_mode: false,
    dark_mode: 'light',
    menu_style: 'collapsible-vertical',
    layout_style: 'full',
  })
  const setLayout = (value) => {
    state.value.layout = value
  }

  const toggleSideBar = (value) => {
    state.value.is_show_sidebar = value
  }

  const toggleSearch = (value) => {
    state.value.is_show_search = value
  }

  const toggleDarkMode = (value) => {
    //light|dark|system
    value = value || 'light';
    localStorage.setItem('dark_mode', value);
    state.value.dark_mode = value;
    if (value == 'light') {
      state.value.is_dark_mode = false;
    } else if (value == 'dark') {
      state.value.is_dark_mode = true;
    } else if (value == 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        state.value.is_dark_mode = true;
      } else {
        state.value.is_dark_mode = false;
      }
    }

    if (state.value.is_dark_mode) {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }

  const toggleMenuStyle = (value) => {
    //horizontal|vertical|collapsible-vertical
    value = value || '';
    localStorage.setItem('menu_style', value);
    state.menu_style = value;
    if (!value || value === 'vertical') {
      state.is_show_sidebar = true;
    } else if (value === 'collapsible-vertical') {
      state.is_show_sidebar = false;
    }
  }

  const toggleLayoutStyle = (value) => {
    //boxed-layout|large-boxed-layout|full
    value = value || '';
    localStorage.setItem('layout_style', value);
    state.layout_style = value;
  }

  return {
    state,
    toggleSideBar,
    setLayout,
    toggleSearch,
    toggleDarkMode,
    toggleMenuStyle,
    toggleLayoutStyle
  }
})