<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->

  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <div id="contentWrapper">
        <h1>Sign Up</h1>
        <form @submit.prevent="submitFormData">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input required v-model="email" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input required v-model="name" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input required v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Repeat password</ion-label>
            <ion-input
              required
              v-model="passwordRepeat"
              type="password"
            ></ion-input>
          </ion-item>
          <ion-item v-if="showPasswordsMustBeTheSame" id="error" color="danger">
            <ion-label>
              Passwords must be the same
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Birth date</ion-label>
            <ion-input required v-model="birthDate" type="text"></ion-input>
          </ion-item>
          <ion-note>
            Birth date must follow format:
            <span font-weight="bold">1970-01-31</span>
          </ion-note>
          <ion-item>
            <ion-label position="floating">Phone number</ion-label>
            <ion-input required v-model="phoneNumber" type="text"></ion-input>
          </ion-item>
          <ion-note>
            Phone number must follow format:
            <span font-weight="bold">+(123)-123-456-789</span>
          </ion-note>
          <ion-list>
            <ion-radio-group v-model="role">
              <ion-list-header>
                <ion-label id="radioLabel">Role</ion-label>
              </ion-list-header>
              <ion-item>
                <ion-label>Admin</ion-label>
                <ion-radio
                  slot="start"
                  color="primary"
                  value="admin"
                ></ion-radio>
              </ion-item>

              <ion-item>
                <ion-label>Customer</ion-label>
                <ion-radio
                  slot="start"
                  color="secondary"
                  value="customer"
                ></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
          <ion-item v-if="showMissingRole" id="error" color="danger">
            <ion-label>
              Please choose role
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Profile picture</ion-label>
            <ion-input required v-model="profilePic" type="text"></ion-input>
          </ion-item>
          <ion-note>
            Profile picture must be a url to an image.
          </ion-note>

          <ion-button
            color="primary"
            id="submitButton"
            type="submit"
            expand="block"
            style="margin-top: 50px;"
            >Submit</ion-button
          >
        </form>

        <ion-item v-if="showInvalidCredentials" id="error" color="danger">
          <ion-label>
            Invalid Login Credentials
          </ion-label>
        </ion-item>
        <ion-item v-if="showUserExists" id="error" color="danger">
          <ion-label>
            User already exists
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
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonListHeader,
  IonNote
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import baseURL from '@/utils/baseURL';
import store from '@/store';
import setAxiosDefaults from '@/utils/setAxiosDefaults';
import { loggedInToast } from '@/utils/toasts';

export default defineComponent({
  name: 'Sign Up',
  components: {
    IonPage,
    IonHeader,
    Navbar,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonListHeader,
    IonNote
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const passwordRepeat = ref('');
    const name = ref('');
    const phoneNumber = ref('');
    const role = ref('');
    const birthDate = ref('');
    const profilePic = ref('');
    // controllers
    const showInvalidCredentials = ref(false);
    const showPasswordsMustBeTheSame = ref(false);
    const showMissingRole = ref(false);
    const showUserExists = ref(false);

    const submitFormData = async () => {
      console.log({
        name: name.value,
        email: email.value,
        phone: phoneNumber.value,
        birth_date: birthDate.value,
        role: role.value,
        password: `${password.value} / ${passwordRepeat.value}`,
        profile_pic: profilePic.value
      });

      if (password.value !== passwordRepeat.value) {
        showPasswordsMustBeTheSame.value = true;
      } else if (role.value == '') {
        showMissingRole.value = true;
      } else {
        try {
          const response = await axios.post(`${baseURL}/user/signup`, {
            name: name.value.trim(),
            email: email.value.trim(),
            phone: phoneNumber.value.trim(),
            birth_date: birthDate.value.trim(),
            role: role.value,
            password: password.value.trim(),
            profile_pic: profilePic.value.trim()
          });
          console.log(response);

          if (response.data.status == 403) {
            showUserExists.value = true;
          } else {
            await store.commit('setUser', response.data.user.user);
            await store.commit('setToken', response.data.token);
            setAxiosDefaults(response.data.token);
            loggedInToast();
            router.push('/');
          }
        } catch (err) {
          console.log(err);
          showInvalidCredentials.value = true;
        }
      }
    };

    return {
      // vars
      email,
      password,
      passwordRepeat,
      name,
      phoneNumber,
      role,
      profilePic,
      birthDate,
      // func
      submitFormData,
      // controllers
      showInvalidCredentials,
      showPasswordsMustBeTheSame,
      showMissingRole,
      showUserExists
    };
  }
});
</script>

<style lang="scss" scoped>
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
ion-list {
  ion-radio-group {
    ion-list-header {
      font-size: 16px;
      text-align: left;
    }
  }
}
</style>
