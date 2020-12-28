<template>
  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
      <h1>This is the home page</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import store from '@/store';

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonHeader,
    Navbar,
    IonContent
  },
  setup() {
    console.log(store.getters.getUser);
  }
});
</script>
