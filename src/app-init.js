import { createPinia } from 'pinia'
import { useLiveStore } from "@/stores/appLiveStore.js";
import { $appDefault } from './app-default';

export default {
    init() {
        const appStore = useLiveStore();

        let val = localStorage.getItem('dark_mode'); // light, dark, system
        if (!val) {
            val = $appDefault.theme;
        }
        
        appStore.toggleDarkMode(val)
        //-
        val = localStorage.getItem('menu_style'); // vertical, collapsible-vertical, horizontal
        if (!val) {
            val = $appDefault.navigation;
        }
        appStore.toggleMenuStyle(val);

        val = localStorage.getItem('layout_style'); // full, boxed-layout, large-boxed-layout
        if (!val) {
            val = $appDefault.layout;
        }
        appStore.toggleLayoutStyle(val);
    },
    toggleMode(mode) {
        if (!mode) {
            let val = localStorage.getItem('dark_mode'); //light|dark|system
            mode = val;
            if (!val) {
                mode = 'light';
            }
        }
        appStore.toggleDarkMode( mode || 'light');
        return mode;
    }
}