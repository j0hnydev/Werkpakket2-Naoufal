<script setup>

</script>

<template>
  <footer class="footer-content">
    <hr>
    <div class="footer-wrapper">
      <div>
        <h4>mangazine@gmail.com</h4>
      </div>
      <div>
        <h4>Elfde-liniestraat 24, Hasselt</h4>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../scss/base.scss';

.footer-content {
  margin: 2.5% 4% 5% 4%;

  .footer-wrapper {
    display: flex;
    justify-content: space-between;

    h4 {
      font-size: $font-smm;
      font-weight: 500;
    }
  }
}
</style>
