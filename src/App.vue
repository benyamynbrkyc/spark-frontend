<template>
  <Menu></Menu>
  <router-view id="main" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';
import { menuController } from '@ionic/vue';

export default defineComponent({
  components: {
    Menu
  },
  setup() {
    menuController.open();
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: 'Cyberpunk';
  src: url(./assets/fonts/Cyberpunk.ttf);
}
#navLogo {
  font-family: 'Cyberpunk';
  font-weight: 900;
  font-size: 30px;
  -webkit-box-shadow: 0px 10px 7px -7px rgba(249, 255, 84, 1);
  -moz-box-shadow: 0px 10px 7px -7px rgba(249, 255, 84, 1);
  box-shadow: 0px 10px 7px -7px rgba(249, 255, 84, 1);
  margin-right: 20px;
}
</style>
