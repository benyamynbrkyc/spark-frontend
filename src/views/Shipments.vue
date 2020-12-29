<template>
  <!-- eslint-disable vue/no-deprecated-slot-attribute -->
  <ion-page>
    <ion-header>
      <navbar></navbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1 id="cartTitle">My &nbsp; Pending &nbsp; Shipments</h1>
      <ion-list id="productsList">
        <ion-item v-for="(shipment, index) in shipments" :key="index">
          <ion-label>
            <h2>
              <b>Created at: {{ shipment.created_at }}</b>
            </h2>
            <h2>
              <b>Delivered at: {{ shipment.delivered_at }}</b>
            </h2>
            <h3>Delivery address: {{ shipment.delivery_address }}</h3>
            <p>Sender address: {{ shipment.sender_address }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonLabel,
  IonItem
} from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import store from '@/store';
import axios from 'axios';
import baseURL from '@/utils/baseURL';

export default defineComponent({
  name: 'Shipments',
  components: {
    IonPage,
    IonHeader,
    Navbar,
    IonContent,
    IonList,
    IonLabel,
    IonItem
  },
  setup() {
    const shipments = ref([]);

    onMounted(async () => {
      const response = await axios.post(`${baseURL}/shipment`, {
        userId: store.getters.getUser._id
      });

      shipments.value = response.data.shipments.shipments;
    });

    return {
      // vars
      shipments
    };
  }
});
</script>

<style lang="scss" scoped>
#productsList {
  max-width: 1000px;
  margin: auto;
}
#adminToolbar {
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
}
#cartTitle {
  font-family: 'Cyberpunk';
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 40px;
}
</style>
