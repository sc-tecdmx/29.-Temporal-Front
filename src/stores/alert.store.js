import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('appAlertStore', {

    id: 'alert',
     state: () => ({
         alert: null
     }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message) {
            this.alert = { message, type: 'alert-danger' };
        },
        clear() {
            this.alert = null;
        }
    }
});
