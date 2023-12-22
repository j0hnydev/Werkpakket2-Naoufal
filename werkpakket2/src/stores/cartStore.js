import {defineStore} from "pinia";
import {useProductStore} from "@/stores/productStore.js";

export const useCartStore = defineStore('shoppingCart', {

    state: () => ({
        cartItems: [],
        productStore: useProductStore()
    }),

    getters: {
        getCartItems: (state) => state.cartItems,
        getTotalQuantity: (state) => {
            let totalQuantity = 0;

            for (const item of state.cartItems) {
                totalQuantity += item.quantity;
            }

            return totalQuantity;
        },
    },

    actions: {
        resetTotalQuantity() {
            this.cartItems = [];
        },
        addToCart: function (cartItem) {
            const productId = cartItem.product.id;
            const existingItemIndex = this.cartItems.findIndex(item => item.product.id === productId);

            this.productStore.updateStock(productId, -cartItem.quantity);

            if (existingItemIndex !== -1) {
                this.cartItems[existingItemIndex].quantity += cartItem.quantity;
            } else {
                this.cartItems.push(cartItem);
            }
        },

        removeFromCart(index) {
            this.cartItems = this.cartItems.filter((item, i) => i !== index);
        },


    },
});
