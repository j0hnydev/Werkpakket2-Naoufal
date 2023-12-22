import {defineStore} from 'pinia';
import accounts from '/src/accounts.json';
import {useCartStore} from "@/stores/cartStore.js";

export const useAccountCheckerStore = defineStore('auth', {
    state: () => ({
        loginStatus: false,
        currentUser: null,
        currentUserCart: useCartStore(),
    }),
    actions: {
        login(email, password) {
            const user = accounts.find((user) => user.password === password && user.email === email);
            if (user) {
                this.loginStatus = true;
                this.currentUser = user;
            } else {
                alert('Wrong password')
            }
        },
        logout() {
            this.currentUser = null;
            this.loginStatus = false;
        },
        getUser() {
            return this.currentUser;
        },
        getUserStatus() {
            return this.loginStatus;
        }
    },
});