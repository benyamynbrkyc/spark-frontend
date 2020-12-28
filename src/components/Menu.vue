<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-menu side="end" menu-id="main-menu" content-id="main">
    <ion-header>
      <ion-toolbar>
        <ion-title id="navLogo">SparkShop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-if="!isEmpty(store.getters.getUser)" button>
          <img :src="store.getters.getUser.profile_pic" id="profilePic" />
          &nbsp;
          {{ store.getters.getUser.name }} ({{
            store.getters.getUser.role === 'admin' ? 'Admin' : false
          }})
        </ion-item>
        <ion-item
          button
          v-if="isEmpty(store.getters.getUser)"
          @click="pushLogin"
        >
          Log in
        </ion-item>
        <ion-item
          button
          v-if="isEmpty(store.getters.getUser)"
          @click="pushSignUp"
        >
          Sign Up
        </ion-item>
        <ion-item
          button
          v-if="!isEmpty(store.getters.getUser)"
          @click="signOut()"
        >
          Sign out
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonItem,
  menuController
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';
import isEmpty from '@/utils/isObjectEmpty';
import { signedOutToast } from '@/utils/toasts';
import signOutHandler from '@/utils/signOut';

export default defineComponent({
  name: 'Menu',
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonItem
  },
  setup() {
    const user = ref(store.getters.getUser);
    const route = useRoute();
    const router = useRouter();

    const pushLogin = () => {
      if (route.fullPath === '/login') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/login');
      }
    };

    const pushSignUp = () => {
      if (route.fullPath === '/signup') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/signup');
      }
    };

    const signOut = async () => {
      try {
        signOutHandler(store, router, signedOutToast);
      } catch (err) {
        router.go();
      }
    };

    return {
      // vars
      user,
      route,
      // func
      pushLogin,
      pushSignUp,
      signOut,
      isEmpty,
      store,
      router
    };
  }
});
</script>
<style lang="scss" scoped>
.menuLabel {
  font-weight: bold;
}
#signOutButton {
  padding: 0px 20px 0px 20px;
}
ion-item {
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
img {
  height: 30px !important;
  width: 30px !important;
  clip-path: circle(50% at 50% 50%);
}
</style>
