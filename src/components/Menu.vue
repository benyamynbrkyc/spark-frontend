<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-menu side="end" menu-id="main-menu" content-id="main">
    <ion-header>
      <ion-toolbar>
        <ion-title @click="pushHome" id="navLogo">SparkShop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          v-if="!isEmpty(store.getters.getUser)"
          button
          @click="pushShip"
        >
          <img :src="store.getters.getUser.profile_pic" id="profilePic" />
          &nbsp;
          {{ store.getters.getUser.name }} ({{
            store.getters.getUser.role === 'admin' ? 'Admin' : false
          }})
        </ion-item>
        <ion-item button @click="pushHome">
          Home
        </ion-item>
        <ion-item
          button
          v-if="!isEmpty(store.getters.getUser)"
          @click="pushDash"
        >
          Dashboard
        </ion-item>
        <ion-item button @click="pushCart">
          Cart
          <ion-icon slot="end" :icon="cartOutline"></ion-icon>
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
  IonIcon,
  menuController
} from '@ionic/vue';
import { cartOutline } from 'ionicons/icons';
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
    IonItem,
    IonIcon
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

    const pushHome = () => {
      if (route.fullPath === '/') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/');
      }
    };

    const pushDash = () => {
      if (route.fullPath === '/dashboard') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/dashboard');
      }
    };

    const pushShip = () => {
      if (route.fullPath === '/shipments') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/shipments');
      }
    };

    const pushCart = () => {
      if (route.fullPath === '/cart') {
        menuController.close();
      } else {
        menuController.close();
        router.push('/cart');
      }
    };

    return {
      // vars
      user,
      route,
      // func
      pushLogin,
      pushSignUp,
      pushDash,
      pushHome,
      pushShip,
      pushCart,
      signOut,
      isEmpty,
      store,
      router,
      // icons
      cartOutline
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
#navLogo {
  cursor: pointer;
}
</style>
