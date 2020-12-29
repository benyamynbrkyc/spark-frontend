<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-title @click="() => router.push('/')" id="navLogo"
        >SparkShop</ion-title
      >
      <div v-if="!mobile">
        <ion-button
          v-if="!isEmpty(user)"
          @click="() => router.push('/shipments')"
        >
          <img :src="user.profile_pic" id="profilePic" />
          &nbsp;
          {{ user.name }}

          <span v-if="user.role === 'admin'">
            &nbsp;(Admin)
          </span>
        </ion-button>
        <ion-button @click="pushHome(router)">Home </ion-button>
        <ion-button v-if="user.role === 'admin'" @click="pushDash()"
          >Dashboard</ion-button
        >
      </div>
    </ion-buttons>
    <ion-buttons slot="end" v-if="!mobile" id="endButtonRow">
      <ion-button v-if="isEmpty(user)" @click="pushLogin">Log in</ion-button>
      <ion-button v-if="isEmpty(user)" @click="pushSignUp">Sign Up</ion-button>
      <ion-button v-if="!isEmpty(user)" @click="pushCart">
        <ion-icon slot="icon-only" :icon="cartOutline"></ion-icon>
      </ion-button>
      <ion-button v-if="!isEmpty(user)" @click="signOut">Sign out</ion-button>
    </ion-buttons>
    <ion-buttons v-if="mobile" id="endButtonRow" slot="end">
      <ion-button
        v-if="route.fullPath !== '/login' && isEmpty(user) && !mobile"
        @click="pushLogin"
        >Log in</ion-button
      >
      <ion-button @click="openMenu">
        <ion-icon slot="icon-only" :icon="menuOutline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script>
import {
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  menuController,
  IonIcon
} from '@ionic/vue';
import { menuOutline, cartOutline } from 'ionicons/icons';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import store from '@/store';
import isEmpty from '@/utils/isObjectEmpty';
import { signedOutToast } from '@/utils/toasts';
import signOutHandler from '@/utils/signOut';
import routeControllers from '@/router/routeControllers';

export default defineComponent({
  name: 'Navbar',
  components: {
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const user = ref(store.getters.getUser);
    const mobile = ref(window.innerWidth < 900);

    const {
      pushLogin,
      pushSignUp,
      pushHome,
      pushDash,
      pushCart
    } = routeControllers();

    onMounted(() => {
      window.addEventListener('resize', () => {
        mobile.value = window.innerWidth < 900;
      });
    });

    const openMenu = () => {
      menuController.open();
    };

    const signOut = async () => {
      try {
        signOutHandler(store, router, signedOutToast);
      } catch (error) {
        router.go();
      }
    };

    return {
      // func
      pushLogin,
      pushHome,
      pushSignUp,
      pushDash,
      pushCart,
      openMenu,
      isEmpty,
      signOut,
      // vars
      route,
      router,
      store,
      user,
      mobile,
      // icons
      menuOutline,
      cartOutline
    };
  }
});
</script>

<style lang="scss" scoped>
#navLogo {
  cursor: pointer;
}
ion-toolbar {
  ion-buttons {
    ion-button {
      margin-right: 10px;
      margin-left: 10px;

      img {
        height: 30px !important;
        width: 30px !important;
        clip-path: circle(50% at 50% 50%);
      }
    }
  }
}

#endButtonRow {
  padding-right: 20px;
}
</style>
