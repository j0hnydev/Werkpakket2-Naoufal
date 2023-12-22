<script>
import Footer from '@/components/FooterComponent.vue'
import Header from '@/components/HeaderComponent.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<template>
<body>
    <Header/>
    <router-view></router-view>
    <Footer/>
</body>
</template>

<style scoped>

</style>