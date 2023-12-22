import {defineStore} from "pinia";
import productsJSON from "/src/products.json"

export const useProductStore = defineStore('products', {

    state: () => ({
        products: productsJSON,
    }),

    actions: {
        updateStock: function (productId, quantity) {
            const product = this.getProductById(productId);

            if (product) {
                product.stock += quantity;
            }
        },
    },

    getters: {
        getProductById: (state) => (productId) => {
            return state.products.find((product) => product.id == productId) || null;
        },
        returnHighestAmount() {
            const sortedProducts = [...this.products].sort((productOne, productTwo) => productOne.stock - productTwo.stock);
            return sortedProducts.slice(0, 3);
        },
    },


});