<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->

  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div id="contentWrapper">
        <h1>Log in</h1>
        <form @submit.prevent="submitLoginCredentials(email, password)">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-button color="primary" type="submit">Submit</ion-button>
        </form>

        <ion-item v-if="showInvalidCredentials" id="error" color="danger">
          <ion-label>
            Invalid Login Credentials
          </ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import baseURL from '@/utils/baseURL';
import store from '@/store';
import { loggedInToast } from '@/utils/toasts';
import setAxiosDefaults from '@/utils/setAxiosDefaults';

export default defineComponent({
  name: 'Login',
  components: {
    IonPage,
    IonHeader,
    Navbar,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    // controllers
    const showInvalidCredentials = ref(false);

    const submitLoginCredentials = async () => {
      try {
        const response: any = await axios.post(`${baseURL}/user/login`, {
          userCredentials: {
            email: email.value,
            password: password.value
          }
        });

        if (response.status == 401) {
          showInvalidCredentials.value = true;
          return;
        }

        await store.commit('setUser', response.data.user);
        await store.commit('setToken', response.data.token);
        setAxiosDefaults(response.data.token);
        loggedInToast();
        router.replace('/');
      } catch (err) {
        showInvalidCredentials.value = true;
      }
    };

    return {
      // func
      submitLoginCredentials,
      // vars
      email,
      password,
      router,
      // controllers
      showInvalidCredentials
    };
  }
});
</script>

<style lang="scss">
#contentWrapper {
  max-width: 500px;
  margin: auto;
  text-align: center;

  h1 {
    margin-bottom: 30px;
  }

  ion-item {
    margin-top: 7px;
    margin-bottom: 7px;
  }

  ion-button {
    margin-top: 14px;
  }

  #error {
    margin-top: 20px;
    border-radius: 10px;
    text-align: center;
    display: inline-block;
  }
}
</style>
